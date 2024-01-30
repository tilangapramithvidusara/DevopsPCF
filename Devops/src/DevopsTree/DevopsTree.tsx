import { Button, Checkbox, Input, Spin, Tree,notification, Tooltip,Space } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import React, { useEffect, useState } from "react";
import {
  fetchAllInternalIdsByBusinessSurveyId,
  fetchWorkItemTypes,
  fetchWorkItemsByBusinessSurveyId,
  generateDevops,
  migaratedJobStatus,
} from "../DevopsTree/DevopsTreeApi/Api";
import { fetchFieldMapping, getDevopsWorkItemType } from "../Api/devopsApis";
import { TreeViewData } from "../Constants/Samples/sample";
import MultiSelectComponent from "./Components/MultiSelectComponent";
import { Trans, useTranslation } from "react-i18next";
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
  currentSequence:any
}
const DevopsTree: React.FC<TreeView> = ({ guid, defaultGuid, language ,currentSequence}) => {
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
  const [currentSelectedNodes, setCurrentSelectedNodes] = useState<any>([]);
  const [savedMappingFieldsData, setSavedMappingFieldsData] = useState<any>([]);
  const [treeData, setTreeData] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkKey, setcheckKey] = useState<any>(true); 
  const [selectedItemsMoscow, setSelectedItemsMoscow] = useState<string[]>([]);
  const [selectedItemsPhase, setSelectedItemsPhase] = useState<string[]>([]);
  const [selectedItemsModule, setSelectedItemsModule] = useState<string[]>([]);
  const [surveySettingDataArr, setSurveySettingDataArr] = useState<any>();
  const [selectedItemsWorkItemType, setSelectedItemsWorkItemType] = useState<
    string[]
  >([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log("currentUser:", window?.parent?.userId,currentSequence);
  const [api, contextHolder] = notification.useNotification();
  const [jobHistoryStatus, setJobHistoryStatus] =useState<any>(false);

  // const fetchRequestToGenerateTree1 = async () => {
  //   fetchAllInternalIdsByBusinessSurveyId(cbsId)
  //     .then(async (res: any) => {
  //       const data: any = await res?.map((item: any) => JSON.parse(item?.data));
  //       setAllInternalIdsBySurveyId(data?.flatMap((obj: any) => obj.results));
  //       const ids = data?.flatMap((obj: any) => obj.results);
  //       console.log("cbsId#", cbsId, "::", data);

  //       fetchWorkItemsByBusinessSurveyId(cbsId)
  //         .then(async (val: any) => {
  //           const workItems = await val?.data;
  //           const jsonData = JSON.parse(workItems);
  //           setWorkItemsBySurveyId(jsonData?.results);
  //           const allInternalIdsBySurveyId = await ids?.map((item: any) => {
  //             return item?.internalid;
  //           });
  //           const filteredData1 = await jsonData?.results?.filter(
  //             (item: any) => {
  //               return allInternalIdsBySurveyId?.includes(item?.internalid);
  //             }
  //           );
  //           filteredData1?.forEach((item: any) => {
  //             for (const field in item) {
  //               if (item[field].includes("🟥", "🟧", "🟨", "🟩")) {
  //                 const valueParts = item[field].split(" ");
  //                 const extractedValue = valueParts[1];
  //                 item[field] = extractedValue;
  //               }
  //             }
  //           });
  //           setFilteredTreeData(filteredData1);
  //           console.log("filteredData@@", filteredData1);
  //         })
  //         .catch((err: any) => console.log("error getting work items", err));
  //     })
  //     .catch((err) => console.log("error getting all ids", err));
  // };

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };


  useEffect(()=> {
    hanldeMigratePrograss()
  },[])
  
  const hanldeMigratePrograss = async()=> {

    const  migratedStatus :any = await migaratedJobStatus(cbsId)
 console.log("migratedStatus",migratedStatus);
 
    setJobHistoryStatus(migratedStatus?.data > 0 ? true :false)

  }
  const fetchRequestToGenerateTree = async () => {
    const data: string | null = localStorage.getItem("items");
    const authData: any = data ? JSON.parse(data) : null;
     setSelectedNodes([])
     setCurrentSelectedNodes([])
    console.log("TREELocal",authData);
    
    fetchWorkItemsByBusinessSurveyId(cbsId,cusbSurveyId,authData?.organizationUri,authData?.projectName)
      .then(async (val: any) => {
        console.log("jsonDataVal*5", val);
        const jsonData = val?.data;
        console.log("jsonData", jsonData);
        console.log("jsonData412", jsonData?.result);

        const jsonFilterData = await jsonData?.result?.filter((item: any) => {
          return item;
        });

        console.log("jsonFilterData*63",jsonFilterData);
        
        jsonFilterData?.forEach((item:any) => {
          for (const field in item) {
            if (typeof item[field] === 'string' && (item[field].includes("🟥") || item[field].includes("🟧") || item[field].includes("🟨") || item[field].includes("🟩"))) {
              const valueParts = item[field].split(" ");
              const extractedValue = valueParts[1];
              item[field] = extractedValue;
            }
          }
        });

        console.log("jsonFilterData*",jsonFilterData);
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
  // const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
  //   console.log("checkRt",info, "info?.checkedNodes",info?.checkedNodes ,"checkedKeys",checkedKeys);
    
  //   setSelectedNodes(info?.checkedNodes);
  //   const filterNodesByCheckedKeys = (node :any, checkedKeys:any, filterFunction:any) => {
  //     const isNodeIncluded = filterFunction(node, checkedKeys);
  
  //     if (isNodeIncluded) {
  //         return {
  //             ...node,
  //             children: node.children?.map((child:any) => filterNodesByCheckedKeys(child, checkedKeys, filterFunction)).filter(Boolean),
  //         };
  //     }
  
  //     else{
  //       return null
  //     }
  // };
      
  //   const genericFilterFunction = (node :any, checkedKeys :any) => checkedKeys.includes(node.key);
  //   let checkedKeysNode :any =checkedKeys;
  //   const checkedKeysResult = checkedKeysNode?.checked;
  //   const filteredArray = treeData
  //       ?.map((item:any) => filterNodesByCheckedKeys(item, checkedKeysResult, genericFilterFunction))
  //       .filter(Boolean);
    
  //   console.log("filteredTree", filteredArray);
    
   


  
  // console.log("setCurrentSelectedNodesUTR",filteredArray);

  

  
  // setCurrentSelectedNodes(filteredArray)
  // };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("checkRt",info, "info?.checkedNodes",info?.checkedNodes ,"checkedKeys",checkedKeys);
    setSelectedNodes(info?.checkedNodes);
    let checkedKeysNode :any =checkedKeys;
    const checkedKeysResult = checkedKeysNode?.checked;
    const filterCheckNodes = info?.checked === false
    ? checkedKeysResult?.filter((item: any) => item !== info?.node?.key)
    : checkedKeysResult;

    setSelectedKeys(filterCheckNodes)
    const handleParentLevel = (treeData:any)=> {
      return  treeData
          ?.map((item:any) => {
            console.log("item223",item);
            
            return filterNodesByCheckedKeys(item, filterCheckNodes, genericFilterFunction)
          })
          .filter(Boolean);
      } 
    const filterNodesByCheckedKeys = (node :any, checkedKeys:any, filterFunction:any) => {
      const isNodeIncluded = filterFunction(node, checkedKeys);
      console.log("isNodeIncluded",isNodeIncluded,node); 
      if (isNodeIncluded) {
          return {
              ...node,
              children: node.children?.map((child:any) => filterNodesByCheckedKeys(child, checkedKeys, filterFunction)).filter(Boolean).flat(Infinity),
          };
      }
      else if(!isNodeIncluded && node?.children?.length){
       return handleParentLevel(node?.children)
      }
      else{
        return null
      }
  };
    const genericFilterFunction = (node :any, checkedKeys :any) => {
      console.log("node963",node,checkedKeys);   
     return checkedKeys.includes(node.key);
    }
   
    const filteredArray = handleParentLevel(treeData)
    console.log("filteredTree", filteredArray)
  console.log("setCurrentSelectedNodesUTR",filteredArray.flat(Infinity));
  setCurrentSelectedNodes(filteredArray.flat(Infinity))
  };
  const handleMigrateToDevops = async () => {
    console.log("handleMigrateToDevopsx");
    setIsLoading(true)
    function flattenHierarchy(item: any) {
      const flatList = [item];
      for (const child of item.children) {
        flatList.push(...flattenHierarchy(child));
      }
      return flatList;
    }
    const flattenedData = [];
    for (const item of selectedNodes?.length ? currentSelectedNodes: treeData) {
      flattenedData.push(...flattenHierarchy(item));
    }
    const nodesToMap = flattenedData;
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
              console.log("x _items", _item);
              // item?.rest[_item?.sourceWorkItem]
              if (x[0] === _item?.sourceWorkItem && _item.isPickListComplete && _item?.devopsWorkItem  !== "N/A") {
                console.log("migaratePiclickst", x[0] ,_item?.sourceWorkItem ,_item.isPickListComplete);
                
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
                        value: devOpsValue === "N/A" ? "" : devOpsValue,
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
                        value: item?.rest[_item?.sourceWorkItem] === "N/A" ?  "" : item?.rest[_item?.sourceWorkItem],
                      }
                    );
                  }
                }
              } else {
                if (
                  _item?.sourceWorkItem !== "Parent Work Item" &&
                  _item?.devopsWorkItem !== "N/A" &&
                  _item?.sourceWorkItem !== "Work item type" &&
                  _item?.fieldReferenceName !== "" 
                  
                ) 
                {
                  if(_item?.sourceWorkItem === "Document Output & Partner Notes"){
                    return (
                     {
                        columnName:
                           _item?.sourceWorkItem,
                        referencePath: `/fields/${_item?.fieldReferenceName}`,
                        value: "",
                      }
                    );
                   }
                 if(_item?.sourceWorkItem === "Document Output"){
                  return (
                    {
                       columnName:
                          _item?.sourceWorkItem,
                       referencePath: `/fields/${_item?.fieldReferenceName}`,
                       value: "",
                     }
                   );
                } if( _item?.sourceWorkItem === "Partner Notes"){
                  return (
                    {
                       columnName:
                          _item?.sourceWorkItem,
                       referencePath: `/fields/${_item?.fieldReferenceName}`,
                       value: "",
                     }
                   );

                }
                  else {
                    return (
                    
                      x[0] === _item?.sourceWorkItem && {
                        columnName:
                          _item?.devopsWorkItem !== undefined
                            ? _item?.devopsWorkItem
                            : _item?.sourceWorkItem,
                        referencePath: `/fields/${_item?.fieldReferenceName}`,
                        value: item?.rest[_item?.sourceWorkItem] === "N/A" ?  "" : item?.rest[_item?.sourceWorkItem],
                      }
                    );
                  }
                }
              }
            });

            console.log("matchFiledArr",matchFiledArr);
            // const _matchFiledArr = matchFiledArr?.length && matchFiledArr.filter(((f:any) => f !== undefined))
            // const filteredArray = matchFiledArr.filter((item:any) => item !== false && item !== null && item !== undefined && typeof item === 'object');
            // console.log("filteredArray",filteredArray);
          return {
            key: _fields?.key,
            targetTable: _fields?.targetTable,
            matchFiledArr,
          };
        }
      );

      console.log("fieldsWithReferncePAth2*", fieldsWithReferncePAth);
      let _workItems = fieldsWithReferncePAth.filter((currentWorkItem: any) => {
        return item?.rest?.["WorkItem Type"] === currentWorkItem?.key;
      });
      return { item, workItems: _workItems };
  // }

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
          const _fieldData = item.matchFiledArr
            .filter((_item: any) =>  _item !== false && _item !== null && _item !== undefined && typeof _item === 'object')
            .map((data: any) => ({
              referencePath: data?.referencePath,
              value: data?.value,
              name: data?.columnName,
            }));

            const fieldData =  _fieldData.filter((item:any) => {
              if (item?.name !== "Document Output"&& item?.name !== "Partner Notes"&& item?.name  !== "Document Output & Partner Notes") {
                  return item.value !== "";
              }
              return true;
            });
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
          sequenceId: item?.key,
          devOpsId: item?.rest["Devops Id"],
          workitemResponseId: item?.rest["Workitem Response Id"],
        };
      })
      .flat();
    // function buildTree(parentId: any) {
    //   const children = [];
    //   const filterArray = generateRequestBody?.filter(
    //     (item: any) => item != null
    //   );
    //   for (const item of filterArray) {
    //     if (item.parentKey === parentId) {
    //       const child: any = {
    //         ...item,
    //         children: buildTree(item.sequenceId),
    //       };
    //       children.push(child);
    //     }
    //   }
    //   return children;
    // }
    // // Initialize the root nodes
    // const rootNode = buildTree("parent");
    // console.log("rootNode*", rootNode);

    console.log("generateRequestBody",generateRequestBody);
    
    const newArr = generateRequestBody?.map((node:any)=> {
      const childArr =  generateRequestBody?.filter(((f:any) => {
        return node?.sequenceId ===  f.parentKey
 
      }))
      node.children = childArr
   return node;
  
 })
 const sequanceIds = new Set();
 
 function collectChildrenParentKeys(items:any) {
   for (const item of items) {
     for (const child of item.children || []) {
       sequanceIds.add(child.parentKey);
       if (child.children && child.children.length > 0) {
         collectChildrenParentKeys(child.children);
       }
     }
   }
 }
 
 collectChildrenParentKeys(newArr);
 
 console.log("sequanceIds", sequanceIds);
 
 const _filteredRootTreeData = newArr.filter(
     (item:any) => !sequanceIds.has(item.parentKey)
   );
  console.log("_filteredRootTreeData",_filteredRootTreeData);
 
  const _addParentKeyData = _filteredRootTreeData?.map((item:any) => ({
    ...item,
    parentKey: "parent"
  }));

  console.log("_addParentKeyData",_addParentKeyData);
 console.log("newArr",newArr);
 
 
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
    const modifiedArr = addParentWorkItemField(_addParentKeyData);

    const obj = {
      surveyId: cbsId,
      businessSurveyId: cusbSurveyId,
      userId: window?.parent?.userId,
      data: modifiedArr,
    };

    console.log("obj", obj);

    if(modifiedArr?.length){
      const response: any = await generateDevops(
        window?.parent?.createDevopsWorkItemURL,
        obj
      );
    console.log("responseMigrate",response);
  
   if(response?.status === 200){
    // setTreeData([])
    // setCurrentSelectedNodes([])
    // setSelectedNodes([])
    // let url = `${window?.origin}/en-US/gyde365-survey-edit/?id=${cbsId}`
      // window.location.href = `${window?.origin}/en-US/gyde365-survey-edit/?id=${cbsId}`\
      openNotification()
      hanldeMigratePrograss()
      fetchRequestToGenerateTree();
      
    
   }else{
    setCurrentSelectedNodes([])
    setSelectedNodes([])
    notification?.error({message:" Unable to migrate the Work Items  to Azure Board.!"})
   }
    }else{
      setCurrentSelectedNodes([])
      setSelectedNodes([])
      notification?.error({message:"Unable to migrate the selected Work Items without Parent Work Item to Azure Board.!'"})
    }
   
  
 setIsLoading(false)

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


  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() =>{
window.location.reload();
api.destroy()
        }}>
          Cancel
        </Button>
        <Button type="primary" size="small" onClick={() => {
           window.location.href = `${window?.origin}/en-US/gyde365-survey-edit/?id=${cbsId}`
           api.destroy(key)
        } }>
          Ok
        </Button>
      </Space>
    );
    api.open({
      message: 'Migration Alert',
      description:
        'Migration process will take a while. Do you want to view the status in Job History page?',
      btn,
      key,
      onClose: close,
    });
  };

  useEffect(() => {
    console.log("ocnChangeTreeData");
    
    onchangeTreeData();
  }, [filteredTreeData]);

  const onchangeTreeData = () => {
    console.log("ocnChangeTreeData");
    const createNode = (title: any,disabled:any= false, key: any, rest: any, children?: any) => {

      console.log("itemRest*", rest?.['Workitem Id'] , rest?.['Workitem Id'] && cbsId !== rest?.['Business Survey Id'],rest,":",cbsId, rest?.['Business Survey Id']);
      
      return {  title : (
        
       
      <div style={{display:'flex'}}>
      <div className= {disabled ? "":checkKey && isMigrated ? "show-workItem-checkbox": ""}>{title}</div>  {rest?.['Workitem Id']  && cbsId !== rest?.['Business Survey Id'] &&  <Tooltip  title= {rest?.['Busniess Survey Name']} trigger="hover">
          <i className="fa fa-info-circle icon-tree"  />
        </Tooltip> }
      </div>
          
        
      ),disabled, key, rest, children: children || [] };
    };
    function constructTree(data: any, parentId: any) {
      const childrenData = data.filter(
        (item: any) => item["Parent Work Item"] === parentId
      );
      const childrenNodes = childrenData.map((child: any) => {
        const _nodeTitle = child?.['Title'] +' - '+ child?.['Devops Id'];
        let disabled =  child?.['Devops Id'] ? true:false
        const {
          Title: title,
          "Workitem Response Id": workitemResponseId,
          ...rest
        } = child;
        const newNode = createNode(_nodeTitle,disabled, workitemResponseId, child);
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
    const handleCurrentSequence = (sequenceType:any)=> {
      let sequenceOrder = sequenceType === "ws" ? "Workitem Item Template Sequance" : "Business Process Id"
      console.log("sequenceOrder",sequenceOrder);
      
     return _filtertedItemArr.sort((a, b) => {
      const valueA = a[sequenceOrder] === "" ? Infinity : parseInt(a[sequenceOrder]);
      const valueB = b[sequenceOrder] === "" ? Infinity : parseInt(b[sequenceOrder]);
    
      return valueA - valueB;
    });
    }
  
    const sortedWorkITems =  currentSequence === "Work Item Sequence" ? handleCurrentSequence("ws"): currentSequence === "Business Process ID" ?  handleCurrentSequence("bs") :_filtertedItemArr
    console.log("sortedWorkITems",sortedWorkITems);
    if(sortedWorkITems?.length === 0) {
      console.log("No Sequence Match",sortedWorkITems);
      return ;
      
    }
    const isMigrated = sortedWorkITems?.some((item:any)=> item?.['Devops Id'] !== "")
    const treeData = sortedWorkITems?.map((item: any) => {
      
        const _nodeTitle = item?.['Title'] +' - '+ item?.['Devops Id'];
        let disabled =  item?.['Devops Id'] ? true:false
        console.log("wokrDisable",disabled, item?.['Devops Id'] );
        
      const {
        Title: title  ,
        "Workitem Response Id": workitemResponseId,
        
        ...rest
      } = item;
      const newNode = createNode(_nodeTitle, disabled,workitemResponseId, item);
      console.log("newNodsee", newNode);
      newNode.children = constructTree(
        sortedWorkITems,
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
    setTreeData([])
    fetchRequestToGenerateTree();
   
 setTimeout(()=> {

  if(treeData?.length){    
    const phaseArr = selectedItemsPhase.map((item) => {
      if (item === 'Phase 1') {
        return "1";
      } else if (item === 'Phase 2') {
        return "2";
      } else if (item === 'Phase 3') {
        return "3";
      } else if (item === 'Phase 4') {
        return "4";
      } else {
        return ""; // Handle other cases here
      }
    });
    const filters = {
      Phase: phaseArr,
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
          node.title = (
            <div style={{ color: 'red', fontWeight: 'bold' }}>
             {node.title}
            </div>
          );
          if (node.children && node.children.length > 0) {
            const filteredChildren = findTree(node.children, filters);
            if (filteredChildren.length > 0) {
              node.children = filteredChildren; // Update the children with filtered ones
              return true; // Include the node if it has filtered children
            }
          }
          return true; // Include the node if it matches the filter
        }
        if (filters?.Moscow && filters.Moscow.includes(Moscow)) {
          node.title = (
            <div style={{ color: 'red', fontWeight: 'bold' }}>
             {node.title}
            </div>
          );
          if (node.children && node.children.length > 0) {
            const filteredChildren = findTree(node.children, filters);
            if (filteredChildren.length > 0) {
              node.children = filteredChildren; // Update the children with filtered ones
              return true; // Include the node if it has filtered children
            }
          }
          return true; // Include the node if it matches the filter
        }
        if (filters?.Module && filters.Module.includes(Module)) {
          node.title = (
            <div style={{ color: 'red', fontWeight: 'bold' }}>
             {node.title}
            </div>
          );
          if (node.children && node.children.length > 0) {
            const filteredChildren = findTree(node.children, filters);
            if (filteredChildren.length > 0) {
              node.children = filteredChildren; // Update the children with filtered ones
              return true; // Include the node if it has filtered children
            }
          }
          return true; // Include the node if it matches the filter
        }
        if (
          filters?.workItemType &&
          filters.workItemType.includes(workItemType)
        ) {
          node.title = (
            <div style={{ color: 'red', fontWeight: 'bold' }}>
             {node.title}
            </div>
          );
          if (node.children && node.children.length > 0) {
            const filteredChildren = findTree(node.children, filters);
            if (filteredChildren.length > 0) {
              node.children = filteredChildren; // Update the children with filtered ones
              return true; // Include the node if it has filtered children
            }
          }
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
    console.log("intialTreeState",intialTreeState);
    
    const filteredTree = findTree(intialTreeState, filters);
    console.log("searcArr", filteredTree);
    if(filteredTree?.length){
      setTreeData(filteredTree);
    }else{
      setTreeData([]);
      fetchRequestToGenerateTree();
      notification?.warning({message:"No such item exists.."})
    }
  }
 },2000)
    
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
    if (itemName === "Work Item Type") {
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

  //const results = extractProperties(treeData);

  const results ={
    "Phase": [
        "Phase 1",
        "Phase 2",
        "Phase 3",
        "Phase 4",
    ],
    "Moscow": [
        "Must",
        "Should",
        "Could",
        "Will not",
    ],
    "Module": [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ],
    "workItemType": [
       ""
    ]
}
  console.log("results", results);

  const handleExpandTree = (isexpand: any) => {
    console.log("state", isexpand, treeData);
    if (isexpand) {
      const extractKeys = (data :any, keysArray:any) => {
        if (data && data.key) {
          keysArray.push(data.key);
        }
      
        if (data.children && data.children.length > 0) {
          data.children.forEach((child:any) => extractKeys(child, keysArray));
        }
      
        return keysArray;
      };
      
      // Initialize an empty array to store all keys
      const allKeys :any= [];
      
      // Iterate over each item in the JSON data array
      treeData.forEach((item:any) => extractKeys(item, allKeys));
      
      // Output the result
      console.log(allKeys);
      setExpandedKeys(allKeys)
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
 useEffect(()=> {
  getWorkItemTypesFromSurveySetting();
 },[])

 const getWorkItemTypesFromSurveySetting = async() => {
  console.log(":_itemId",cbsId);
  
      const workItemModule  = await getDevopsWorkItemType(cbsId,"module")
      const workItemType = await getDevopsWorkItemType(cbsId,"workItemType")
      console.log("workItemType",workItemType);

      const results ={
        "Phase": [
            "Phase 1",
            "Phase 2",
            "Phase 3",
            "Phase 4",
        ],
        "Moscow": [
            "Must",
            "Should",
            "Could",
            "Will not",
        ],
        "Module":workItemModule,
        "workItemType":workItemType
    }
      setSurveySettingDataArr(results)
   }

  const showhandleWorkItem = () => {
    setTreeData([])
    console.log("check");
 setcheckKey(!checkKey)
    fetchRequestToGenerateTree();
    hanldeMigratePrograss();
  };
 console.log("surveySettingDataArr",surveySettingDataArr);
 
  return (
    <div className="work-item-summary">
  {contextHolder}
      {treeData?.length && selectedKeys?.length > 0 ? (
        
        <>
         <div className="heading">
         <img src="/list.png" className="list-img" alt="list"/>
         <h1 className="workitemSummary"> <Trans>DevOpsTree_workItemTitle</Trans></h1>
         </div>
        
          <div className="dropdown-wrap">
            { (
              <div className="multiSelectDropDown">
                <MultiSelectComponent
                  itemName={"Moscow"}
                  treeData={surveySettingDataArr?.Moscow.length ? surveySettingDataArr?.Moscow : []}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedItems={
                    selectedItemsMoscow?.length ? selectedItemsMoscow : []
                  }
                />
              </div>
            )}
            { (
              <div className="multiSelectDropDown">
                <MultiSelectComponent
                  itemName={"Module"}
                  treeData={surveySettingDataArr?.Module.length ? surveySettingDataArr?.Module : []}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedItems={
                    selectedItemsModule?.length ? selectedItemsModule : []
                  }
                />
              </div>
            )}

            { (
              <div className="multiSelectDropDown">
                <MultiSelectComponent
                  itemName={"Phase"}
                  treeData={surveySettingDataArr?.Phase.length ? surveySettingDataArr?.Phase : []}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedItems={
                    selectedItemsPhase?.length ? selectedItemsPhase : []
                  }
                />
              </div>
            )}

            {(
              <div className="multiSelectDropDown">
                <MultiSelectComponent
                  itemName={"Work Item Type"}
                  treeData={
                    surveySettingDataArr?.workItemType.length ? surveySettingDataArr?.workItemType : []
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
            ><Trans>DevOpsTree_ApplyBtn</Trans>
         
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
              <Trans>DevOpsTree_CollapseBtn</Trans>
              
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
                <Trans>DevOpsTree_ExpandBtn</Trans>
            
            
            </Button>
            </div>
            <Checkbox  checked= {checkKey} className="workitem-checkbox  flex-center" onChange={showhandleWorkItem}>
              {" "}
              <Trans>DevOpsTree_ShowNewWorkItemsTitle</Trans>
             
            </Checkbox>
          </div>
          <Spin spinning={isLoading}> 
          <Tree
            checkable
            onExpand={onExpand}
            checkedKeys={[...selectedKeys]}
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
               <Trans>DevOpsTree_BackBTN</Trans>
              
            </Button>

            <Button
              type="primary"
              htmlType="button"
              disabled={isLoading ? true : jobHistoryStatus ? true : false}
              onClick={handleMigrateToDevops}
              style={{ marginTop: 10 }}
            > <Trans>DevOpsTree_MigrateTitle</Trans>
            
            </Button>
            
          </div>
          </Spin>
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default DevopsTree;


