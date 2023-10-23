import { Button, Checkbox, Input, Spin, Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import React, { useEffect, useState } from "react";
import {
  fetchAllInternalIdsByBusinessSurveyId,
  fetchWorkItemTypes,
  fetchWorkItemsByBusinessSurveyId,
  generateDevops,
} from "../DevopsTree/DevopsTreeApi/Api";
import { fetchFieldMapping } from "../Api/devopsApis";
import { TreeViewData } from "../Constants/Samples/sample";
import MultiSelectComponent from "./Components/MultiSelectComponent";
// import { findNodeAndRelations } from "../helper/GetParentNode";

declare global {
  interface Window {
    webapi: any;
    createDevopsWorkItemURL: any;
    userId: any;
  }
}

const internalIds: any = [
  {
    internalid: "1472",
  },
  {
    internalid: "DV-439",
  },
  {
    internalid: "1472_1473",
  },
  {
    internalid: "DV-439_DV-440",
  },
  {
    internalid: "1472_1473_1474",
  },
  {
    internalid: "1472_1473_1477",
  },
  {
    internalid: "1472_1473_1478",
  },
  {
    internalid: "1472_1473_1660",
  },
  {
    internalid: "DV-439_DV-440_DV-441",
  },
];
interface TreeView {
  guid: any;
  defaultGuid: any;
  language: any;
}
const DevopsTree: React.FC<TreeView> = ({ guid, defaultGuid, language }) => {
  const url = new URL(window.location.href);
  const queryParameters = url.searchParams;
  const _navigateUrl = queryParameters.get("returnto");
  const cbsId = queryParameters.get("id");
  const cusbSurveyId = queryParameters.get("cbsid");
  const [filteredTreeData, setFilteredTreeData] = useState([]);
  const [intialTreeState, setIntialTreeState] =useState<any>([]);
  const [workItemsBySurveyId, setWorkItemsBySurveyId] = useState<any>();
  const [allInternalIdsBySurveyId, setAllInternalIdsBySurveyId] =
    useState<any>();
  const [selectedNodes, setSelectedNodes] = useState<any>([]);
  const [savedMappingFieldsData, setSavedMappingFieldsData] = useState<any>([]);
  const [treeData, setTreeData] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemsMoscow, setSelectedItemsMoscow] = useState<string[]>([]);
  const [selectedItemsPhase, setSelectedItemsPhase] = useState<string[]>([]);
  const [selectedItemsModule, setSelectedItemsModule] = useState<string[]>([]);
  const [selectedItemsWorkItemType, setSelectedItemsWorkItemType] = useState<
    string[]
  >([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  console.log("currentUser:", window?.parent?.userId);

  const fetchRequestToGenerateTree1 = async () => {
    fetchAllInternalIdsByBusinessSurveyId(cbsId)
      .then(async (res: any) => {
        const data: any = await res?.map((item: any) => JSON.parse(item?.data));
        setAllInternalIdsBySurveyId(data?.flatMap((obj: any) => obj.results));
        const ids = data?.flatMap((obj: any) => obj.results);
        console.log("cbsId#", cbsId, "::", data);

        fetchWorkItemsByBusinessSurveyId(cbsId)
          .then(async (val: any) => {
            const workItems = await val?.data;
            const jsonData = JSON.parse(workItems);
            setWorkItemsBySurveyId(jsonData?.results);
            const allInternalIdsBySurveyId = await ids?.map((item: any) => {
              return item?.internalid;
            });
            const filteredData1 = await jsonData?.results?.filter(
              (item: any) => {
                return allInternalIdsBySurveyId?.includes(item?.internalid);
              }
            );
            filteredData1?.forEach((item: any) => {
              for (const field in item) {
                if (item[field].includes("🟥", "🟧", "🟨", "🟩")) {
                  const valueParts = item[field].split(" ");
                  const extractedValue = valueParts[1];
                  item[field] = extractedValue;
                }
              }
            });
            setFilteredTreeData(filteredData1);
            console.log("filteredData@@", filteredData1);
          })
          .catch((err: any) => console.log("error getting work items", err));
      })
      .catch((err) => console.log("error getting all ids", err));
  };

  const fetchRequestToGenerateTree = async () => {
    fetchWorkItemsByBusinessSurveyId(cbsId)
      .then(async (val: any) => {
        console.log("jsonDataVal*5", val);
        const jsonData = val?.data;
        console.log("jsonData", jsonData);
        console.log("jsonData412", jsonData?.result);

        const jsonFilterData = await jsonData?.result?.filter((item: any) => {
          return item;
        });
        jsonFilterData?.forEach((item: any) => {
          for (const field in item) {
            if (item[field].includes("🟥", "🟧", "🟨", "🟩")) {
              const valueParts = item[field].split(" ");
              const extractedValue = valueParts[1];
              item[field] = extractedValue;
            }
          }
        });
        setFilteredTreeData(jsonFilterData);
        console.log("filteredData@@", jsonFilterData);
      })
      .catch((err: any) => console.log("error getting work items", err));
  };

  useEffect(() => {
    fetchRequestToGenerateTree();

    console.log(
      "createDevopsWorkItemURLTest",
      window?.parent?.createDevopsWorkItemURL
    );
  }, []);

  console.log("filteredData", filteredTreeData);

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    setSelectedNodes(info?.checkedNodes);
  };

  const handleMigrateToDevops = async () => {
    function flattenHierarchy(item: any) {
      const flatList = [item];
      for (const child of item.children) {
        flatList.push(...flattenHierarchy(child));
      }
      return flatList;
    }
    const flattenedData = [];
    for (const item of treeData) {
      flattenedData.push(...flattenHierarchy(item));
    }
    const nodesToMap = selectedNodes?.length ? selectedNodes : flattenedData;
    console.log("flattenedData", nodesToMap);
    const allNodes = nodesToMap.map((item: any) => {
      let fieldsWithReferncePAth = savedMappingFieldsData?.map(
        (_fields: any) => {
          let matchFiledArr =
            _fields?.key &&
            item?.rest["WorkItem Type"] &&
            _fields.value?.length &&
            _fields.value.map((_item: any) => {
              let x = Object.keys(item?.rest).filter((values) => {
                if (_item?.sourceWorkItem === values) {
                  return _item?.sourceWorkItem === values;
                }
              });

              console.log("x values", x);

              if (x[0] === _item?.sourceWorkItem && _item.isPickListComplete) {
                const defaultOption =
                  _item.defaultOptionList?.defaultOptionList[0];
                const crmOptionIndex = defaultOption?.crmOption.indexOf(
                  item?.rest[_item?.sourceWorkItem]
                );
                if (crmOptionIndex !== -1) {
                  const devOpsValue =
                    defaultOption.devOpsOption[crmOptionIndex];
                  if (
                    _item?.sourceWorkItem !== "Parent Work Item" &&
                    _item?.devopsWorkItem !== "N/A" &&
                    _item?.sourceWorkItem !== "Work item type" &&
                    _item?.fieldReferenceName !== "" &&
                    item?.rest[_item?.sourceWorkItem]
                  ) {
                    return (
                      x[0] === _item?.sourceWorkItem && {
                        columnName:
                          _item?.devopsWorkItem !== undefined
                            ? _item?.devopsWorkItem
                            : _item?.sourceWorkItem,
                        referencePath: `/fields/${_item?.fieldReferenceName}`,
                        value: devOpsValue,
                      }
                    );
                  }
                } else {
                  if (
                    _item?.sourceWorkItem !== "Parent Work Item" &&
                    _item?.devopsWorkItem !== "N/A" &&
                    _item?.sourceWorkItem !== "Work item type" &&
                    _item?.fieldReferenceName !== "" &&
                    item?.rest[_item?.sourceWorkItem]
                  ) {
                    return (
                      x[0] === _item?.sourceWorkItem && {
                        columnName:
                          _item?.devopsWorkItem !== undefined
                            ? _item?.devopsWorkItem
                            : _item?.sourceWorkItem,
                        referencePath: `/fields/${_item?.fieldReferenceName}`,
                        value: item?.rest[_item?.sourceWorkItem],
                      }
                    );
                  }
                }
              } else {
                if (
                  _item?.sourceWorkItem !== "Parent Work Item" &&
                  _item?.devopsWorkItem !== "N/A" &&
                  _item?.sourceWorkItem !== "Work item type" &&
                  _item?.fieldReferenceName !== "" &&
                  item?.rest[_item?.sourceWorkItem]
                ) {
                  return (
                    x[0] === _item?.sourceWorkItem && {
                      columnName:
                        _item?.devopsWorkItem !== undefined
                          ? _item?.devopsWorkItem
                          : _item?.sourceWorkItem,
                      referencePath: `/fields/${_item?.fieldReferenceName}`,
                      value: item?.rest[_item?.sourceWorkItem],
                    }
                  );
                }
              }
            });
          return {
            key: _fields?.key,
            targetTable: _fields?.targetTable,
            matchFiledArr,
          };
        }
      );

      console.log("fieldsWithReferncePAth*", fieldsWithReferncePAth);

      let _workItems = fieldsWithReferncePAth.filter((currentWorkItem: any) => {
        return item?.rest?.["WorkItem Type"] === currentWorkItem?.key;
      });
      return { item, workItems: _workItems };
    });
    console.log("allNodes", allNodes);
    const generateRequestBody = allNodes
      ?.map((node: any) => {
        const { workItems, item } = node;
        if (!workItems || workItems.length === 0) return null;
        const parentWorkItem = item?.rest["Parent Work Item"];
        const parentId = item?.rest["Workitem Response Id"];
        const formattedParentWorkItem = parentWorkItem;
        const _workItemBody = workItems.map((item: any) => {
          const fieldData = item.matchFiledArr
            .filter((_item: any) => _item !== undefined)
            .map((data: any) => ({
              referencePath: data?.referencePath,
              value: data?.value,
              name: data?.columnName,
            }));
          const data: string | null = localStorage.getItem("items");
          const authData: any = data && JSON.parse(data);
          return {
            organizationUri: authData?.organizationUri,
            personalAccessToken: authData?.personalAccessToken,
            projectName: authData?.projectName,
            workItemType: item.targetTable,
            fieldData,
          };
        });

        return {
          parentKey: formattedParentWorkItem
            ? formattedParentWorkItem
            : "parent",
          workItemBody: _workItemBody,
          workItemId: item?.rest["Workitem Id"],
          sequenceId: parentId,
          workitemResponseId: item?.rest["Workitem Response Id"],
        };
      })
      .flat();
    function buildTree(parentId: any) {
      const children = [];
      const filterArray = generateRequestBody?.filter(
        (item: any) => item != null
      );
      for (const item of filterArray) {
        if (item.parentKey === parentId) {
          const child: any = {
            ...item,
            children: buildTree(item.sequenceId),
          };
          children.push(child);
        }
      }
      return children;
    }
    // Initialize the root nodes
    const rootNode = buildTree("parent");
    console.log("rootNode*", rootNode);

    function addParentWorkItemField(arr: any) {
      const newArray = [];

      for (const item of arr) {
        const newItem = { ...item };

        if (newItem.children && newItem.children.length > 0) {
          newItem.children = addParentWorkItemField(newItem.children);
        }

        if (
          newItem.parentKey !== "parent" &&
          newItem.workItemBody &&
          newItem.workItemBody.length > 0
        ) {
          newItem.workItemBody.forEach((workItem: any) => {
            if (workItem.fieldData && workItem.fieldData.length > 0) {
              workItem.fieldData.push({
                referencePath: "",
                value: "",
                name: "parentworkitem",
              });
            }
          });
        }

        newArray.push(newItem);
      }

      return newArray;
    }

    // Create a new array with the modifications
    const modifiedArr = addParentWorkItemField(rootNode);

    const obj = {
      surveyId: cbsId,
      businessSurveyId: cusbSurveyId,
      userId: window?.parent?.userId,
      data: modifiedArr,
    };

    console.log("obj", obj);

    const response: any = await generateDevops(
      window?.parent?.createDevopsWorkItemURL,
      obj
    );

    async function processNode(
      node: any,
      parentUrl: any = null,
      isChid: boolean = false
    ) {
      async function migarateApi() {
        const response: any = await generateDevops(
          window?.parent?.createDevopsWorkItemURL,
          node.workItemBody[0]
        );
        console.log("saving", node.workItemBody[0]);
        console.log("responseresponse", response);
        console.log("response", response?.data?.Value.Url);
        const _parentUrl = response?.data?.Value.Url;
        console.log("_parentUrl", _parentUrl);
        // Process child nodes
        if (node.children) {
          for (const childNode of node.children) {
            processNode(childNode, _parentUrl, true);
          }
        }
      }
      // Perform API call using node data
      console.log("API call for node:", node);
      if (parentUrl && isChid) {
        const newFieldEntry = {
          referencePath: "aaa",
          value: `${parentUrl}`,
          name: "parentworkitem",
        };
        node.workItemBody[0].fieldData.push(newFieldEntry);
        migarateApi();
      } else if (parentUrl === null && isChid === false) {
        migarateApi();
      }
    }
    // Loop through the tree and make API calls
    // for (const node of rootNode) {
    //   processNode(node);
    // }
  };

  const fetchFieldMappingData = async () => {
    if (guid) {
      let _result: any = await fetchFieldMapping(guid);
      console.log("_result", _result);

      if (_result.type == "success") {
        const _resultData = _result?.data.data;
        setSavedMappingFieldsData(_resultData);
      } else if (_result.type == "error") return [];
    } else if (defaultGuid) {
      let _result: any = await fetchFieldMapping(defaultGuid);
      if (_result.type == "success") {
        const _resultData = _result?.data.data;
        setSavedMappingFieldsData(_resultData);
      }
    } else {
      return [];
    }
  };

  useEffect(() => {
    onchangeTreeData();
  }, [filteredTreeData]);

  const onchangeTreeData = () => {
    const createNode = (title: any, key: any, rest: any, children?: any) => {
      return { title, key, rest, children: children || [] };
    };
    function constructTree(data: any, parentId: any) {
      const childrenData = data.filter(
        (item: any) => item["Parent Work Item"] === parentId
      );
      const childrenNodes = childrenData.map((child: any) => {
        const {
          Title: title,
          "Workitem Response Id": workitemResponseId,
          ...rest
        } = child;
        const newNode = createNode(title, workitemResponseId, rest);
        newNode.children = constructTree(data, workitemResponseId);
        return newNode;
      });
      return childrenNodes;
    }
    const _filtertedItemArr = filteredTreeData?.filter((item: any) =>
      savedMappingFieldsData?.some((_item: any) => {
        return _item.key === item?.["WorkItem Type"];
      })
    );
    console.log("_filtertedItemArr", _filtertedItemArr);
    const treeData = _filtertedItemArr.map((item: any) => {
      var id = Math.random().toString(16).slice(2);
      const {
        Title: title,
        "Workitem Response Id": workitemResponseId,
        ...rest
      } = item;
      const newNode = createNode(title, workitemResponseId, item);
      console.log("newNodsee", newNode);
      newNode.children = constructTree(
        _filtertedItemArr,
        item?.["Workitem Response Id"]
      );
      return newNode;
    });

    const sequanceIds = new Set();

    // Step 1: Collect the Workitem Response Ids of all children
    for (const item of treeData) {
      for (const child of item.children || []) {
        sequanceIds.add(child.key); // Use the key (Workitem Response Id) of the child
      }
    }

    // Step 2: Filter treeData to remove nodes that have child nodes
    const _filteredTreeData = treeData.filter(
      (item) => !sequanceIds.has(item.key)
    );

    console.log("_filteredTreeData", _filteredTreeData);
 
    setTreeData(_filteredTreeData);
    setIntialTreeState(_filteredTreeData)
    
    const getAllTreeNodeKeys = (_filteredTreeData: any) => {
      const keys: string[] = [];
      for (const item of _filteredTreeData) {
        keys.push(item.key);
        if (item.children && item.children.length > 0) {
          const childKeys = getAllTreeNodeKeys(item.children);
          keys.push(...childKeys);
        }
      }
      return keys;
    };
    const keys = getAllTreeNodeKeys(treeData);
    setSelectedKeys(keys);
  };

  // const onchangeTreeData = () => {
  //   const createNode = (title:any, key:any, rest, children) => {
  //     return { title, key, rest, children: children || [] };
  //   };
  //   function constructTree(data, parentId) {

  //     const childrenData = data.filter(
  //       (item) => item.parentWorkItem === parentId
  //     );
  //     const childrenNodes = childrenData.map((child) => {
  //       var id =  Math.random().toString(16).slice(2)
  //       const { title, workitemResponseId, ...rest } = child;
  //       const newNode = createNode(title, workitemResponseId+id, child);
  //       newNode.children = constructTree(data, child?.workitemResponseId);
  //       return newNode;
  //     });
  //     return childrenNodes;
  //   }

  //   console.log("_filtertedItemArr", result);
  //   const treeData = result?.result.map((item) => {
  //       var id =  Math.random().toString(16).slice(2)
  //     const { title, workitemResponseId, ...rest } = item;
  //     const newNode = createNode(title, workitemResponseId+id, item);
  //     console.log("newNodsee", newNode);
  //     newNode.children = constructTree(result?.result, item?.workitemResponseId);
  //     return newNode;
  //   });

  //   // const sequanceIds = new Set();
  //   // for (const item of treeData) {
  //   //   for (const child of item.children || []) {
  //   //     sequanceIds.add(child.rest.workitemResponseId);
  //   //   }
  //   // }

  // const _filteredTreeData = treeData.filter(
  //   (item) => !sequanceIds.has(item.key)
  // );
  //   console.log("_filteredTreeData*", treeData);
  //   // setTreeData(_filteredTreeData);
  //   // const getAllTreeNodeKeys = (_filteredTreeData) => {
  //   //   const keys = [];
  //   //   for (const item of _filteredTreeData) {
  //   //     keys.push(item.key);
  //   //     if (item.children && item.children.length > 0) {
  //   //       const childKeys = getAllTreeNodeKeys(item.children);
  //   //       keys.push(...childKeys);
  //   //     }
  //   //   }
  //   //   return keys;
  //   // };
  //   // const keys = getAllTreeNodeKeys(_filteredTreeData);
  //   // setSelectedKeys(keys);
  // };

  useEffect(() => {
    fetchWorkItemTypes()
      .then((res) => console.log("res", res))
      .catch((err: any) => console.log(err));
    const result = fetchFieldMappingData();
    console.log("field mapping data: ", result);
  }, []);

  const handleSearch = () => {
    setTreeData(intialTreeState)
    const filters = {
      Phase: selectedItemsPhase,
      Moscow: selectedItemsMoscow,
      Module: selectedItemsModule,
      workItemType: selectedItemsWorkItemType,
      // Example filter for Phase, change as needed
    };
    const findTree = (nodes: any, filters: any) => {
      console.log("nodes8777", nodes, filters);
    

      const filteredNodes = nodes.filter((node: any) => {
        const Phase = node?.rest?.Phase;
        const Moscow = node?.rest?.Moscow;
        const Module = node?.rest?.Module;
        const workItemType = node?.rest?.["WorkItem Type"];
        console.log(
          "nodes8337",
          nodes,
          filters,
          Phase,
          Moscow,
          Module,
          workItemType
        );

        console.log("tag7741", filters.Phase.includes(Phase));

        if (filters?.Phase && filters.Phase.includes(Phase)) {
          return true; // Include the node if it matches the filter
        }
        if (filters?.Moscow && filters.Moscow.includes(Moscow)) {
          return true; // Include the node if it matches the filter
        }
        if (filters?.Module && filters.Module.includes(Module)) {
          return true; // Include the node if it matches the filter
        }
        if (
          filters?.workItemType &&
          filters.workItemType.includes(workItemType)
        ) {
          return true; // Include the node if it matches the filter
        }
        // Check child nodes recursively
        if (node.children && node.children.length > 0) {
          const filteredChildren = findTree(node.children, filters);
          if (filteredChildren.length > 0) {
            node.children = filteredChildren; // Update the children with filtered ones
            return true; // Include the node if it has filtered children
          }
        }

        return false; // Exclude the node if it doesn't match the filter
      });

      return filteredNodes;
    };
    console.log("filters", filters);
    const filteredTree = findTree(treeData, filters);
    console.log("searcArr", filteredTree);
    setTreeData(filteredTree);
  };

  const extractProperties = (arr: any) => {
    return arr.reduce(
      (acc: any, item: any) => {
        if (item.rest) {
          item.rest?.Phase !== undefined && acc?.Phase.push(item.rest.Phase);
          item.rest?.Moscow !== undefined && acc?.Moscow.push(item.rest.Moscow);
          item.rest?.Module !== undefined &&
            acc?.Module.push(item.rest?.Module);
          item.rest?.["WorkItem Type"] !== undefined &&
            acc?.workItemType.push(item.rest?.["WorkItem Type"]);
        }
        if (item.children && item.children.length > 0) {
          const childResults = extractProperties(item.children);
          item.rest?.Phase !== undefined &&
            acc?.Phase.push(...childResults.Phase);
          item.rest?.Moscow !== undefined &&
            acc?.Moscow.push(...childResults.Moscow);
          item.rest?.Module !== undefined &&
            acc?.Module.push(...childResults.Module);
          item.rest?.["WorkItem Type"] !== undefined &&
            acc?.workItemType.push(...childResults.workItemType);
        }
        return acc;
      },
      {
        Phase: [],
        Moscow: [],
        Module: [],
        workItemType: [],
      }
    );
  };

  const handleCheckboxChange = (item: string, itemName: String) => {
    console.log("item", item,treeData);
    if (itemName === "Moscow") {
      if (selectedItemsMoscow.includes(item)) {
        setSelectedItemsMoscow(selectedItemsMoscow.filter((i) => i !== item));
      } else {
        setSelectedItemsMoscow([...selectedItemsMoscow, item]);
      }
    }
    if (itemName === "Phase") {
      if (selectedItemsPhase.includes(item)) {
        setSelectedItemsPhase(selectedItemsPhase.filter((i) => i !== item));
      } else {
        setSelectedItemsPhase([...selectedItemsPhase, item]);
      }
    }
    if (itemName === "Module") {
      if (selectedItemsModule.includes(item)) {
        setSelectedItemsModule(selectedItemsModule.filter((i) => i !== item));
      } else {
        setSelectedItemsModule([...selectedItemsModule, item]);
      }
    }
    if (itemName === "workItemType") {
      if (selectedItemsWorkItemType.includes(item)) {
        setSelectedItemsWorkItemType(
          selectedItemsWorkItemType.filter((i) => i !== item)
        );
      } else {
        setSelectedItemsWorkItemType([...selectedItemsWorkItemType, item]);
      }
    }
  };

  useEffect(() => {
    console.log(
      "selectedItems",
      selectedItemsModule,
      selectedItemsPhase,
      selectedItemsMoscow
    );
  }, [selectedItemsModule, selectedItemsMoscow, selectedItemsPhase]);

  const results = extractProperties(treeData);
  console.log("results", results);

  const handleExpandTree = (isexpand: any) => {
    console.log("state", isexpand, treeData);
    if (isexpand) {
      const expandKey = treeData.map((node: any) => node.key);
      console.log("expandKey", expandKey);

      setExpandedKeys(expandKey);
    } else {
      setExpandedKeys([]);
    }
  };

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
  };

  return (
    <div className="work-item-summary">
    <h1 className="workitemSummary"> {language?.DevOpsTree_workItemTitle}</h1>
      {treeData?.length && selectedKeys?.length > 0 ? (
        <>
          <div className="dropdown-wrap">
            {results?.Moscow.length > 0 && (
              <div className="multiSelectDropDown">
                <MultiSelectComponent
                  itemName={"Moscow"}
                  treeData={results?.Moscow.length ? results?.Moscow : []}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedItems={
                    selectedItemsMoscow?.length ? selectedItemsMoscow : []
                  }
                />
              </div>
            )}
            {results?.Module.length > 0 && (
              <div className="multiSelectDropDown">
                <MultiSelectComponent
                  itemName={"Module"}
                  treeData={results?.Module.length ? results?.Module : []}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedItems={
                    selectedItemsModule?.length ? selectedItemsModule : []
                  }
                />
              </div>
            )}

            {results?.Phase.length > 0 && (
              <div className="multiSelectDropDown">
                <MultiSelectComponent
                  itemName={"Phase"}
                  treeData={results?.Phase.length ? results?.Phase : []}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedItems={
                    selectedItemsPhase?.length ? selectedItemsPhase : []
                  }
                />
              </div>
            )}

            {results?.workItemType.length > 0 && (
              <div className="multiSelectDropDown">
                <MultiSelectComponent
                  itemName={"workItemType"}
                  treeData={
                    results?.workItemType.length ? results?.workItemType : []
                  }
                  handleCheckboxChange={handleCheckboxChange}
                  selectedItems={
                    selectedItemsWorkItemType?.length
                      ? selectedItemsWorkItemType
                      : []
                  }
                />
              </div>
            )}

            <Button
              type="primary"
              onClick={handleSearch}
            >
              {language?.DevOpsTree_ApplyBtn}
            </Button>
          </div>
          <div className="btn-wrap flex-center">
            <div>
              <Button
              onClick={() => {
                handleExpandTree(false);
              }}
              className="collapse-btn"
              color="#00AEA7"
            >
              {" "}
              <img
                src="/collapse.png"
                alt="icon"
                className="icon"
              />{" "}
              {language?.DevOpsTree_CollapseBtn}
            </Button>
            <Button
              onClick={() => {
                handleExpandTree(true);
              }}
              className="collapse-btn"
              color="#00AEA7"
            >
              {" "}
              <img
                src="/expand.png"
                alt="icon"
                className="icon"
              />{" "}
              {language?.DevOpsTree_ExpandBtn}
            </Button>
            </div>
            <Checkbox className="workitem-checkbox  flex-center">
              {" "}
              {language?.DevOpsTree_ShowNewWorkItemsTitle}
            </Checkbox>
          </div>
          <Tree
            checkable
            onExpand={onExpand}
            defaultCheckedKeys={[...selectedKeys]}
            expandedKeys={expandedKeys}
            // onSelect={onSelect}
            checkStrictly={true}
            selectable={false}
            onCheck={onCheck}
            treeData={treeData}
          />
          <div className="text-right mt-20">
            <Button
              className="cancel-btn mr-10"
              type="primary"
              htmlType="button"
              style={{ marginTop: 10 }}
              onClick={() => {
                window.location.reload();
              }}
            >
              {language?.DevOpsTree_BackBTN}
            </Button>

            <Button
              type="primary"
              htmlType="button"
              onClick={handleMigrateToDevops}
              style={{ marginTop: 10 }}
            >
              {language?.DevOpsTree_MigrateTitle}
            </Button>
          </div>
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default DevopsTree;
