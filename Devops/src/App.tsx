import { Button, Checkbox, Radio, Tooltip, Tree, TreeProps } from "antd";
import React, { useEffect, useState } from "react";
import { TreeViewData } from "./Constants/Samples/sample";
import MultiSelectComponentProps from "./DevopsTree/Components/MultiSelectComponent";
import ConnectionContainer from "./Features/ConnectionContainer";
import { Trans, useTranslation } from "react-i18next";
import ButtonGroup from 'antd/es/button/button-group';

import "./i18n";
export interface AppConfig {
  apiKey: string;
  apiEndpoint: string;
}

interface AppProps {
  config: AppConfig;
}

const App: React.FC<AppProps> = ({ config }) => {
  console.log("configv ======> ", config);
  const { i18n } = useTranslation();
  const url = new URL(window.location.href);
  
  // const fetchProperties = async () => {
  //   const response = await fetch(configProperties);
  //   const fileContent = await response.text();

  //   const properties = {};
  //   fileContent.split('\n').forEach(line => {
  //     const [key, value] = line.split('=');
  //     properties[key.trim()] = value.trim();
  //   });

  //   return properties;
  // };

  // useEffect(() => {
  //   fetchProperties()
  //     .then(properties => {
  //       const myValue = properties.myKey;
  //       console.log(myValue); // Outputs: Hello World
  //     })
  //     .catch(error => {
  //       console.error('Failed to fetch properties:', error);
  //     });
  // }, []);

  // const componentShift = () => {
  //   if(window.pa){
  //     return <ConnectionContainer/>;
  //   }else {
  //     return <DevopsTree/>;
  //   }
  // }

  const [selectedItemsMoscow, setSelectedItemsMoscow] = useState<string[]>([]);
  const [selectedItemsPhase, setSelectedItemsPhase] = useState<string[]>([]);
  const [selectedItemsModule, setSelectedItemsModule] = useState<string[]>([]);
  const [selectedItemsWorkItemType, setSelectedItemsWorkItemType] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [treeData, setTreeData] = useState<any>([]);
  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);


   useEffect(()=> {
    handleLanguege('en')
   },[])
  const handleCheckboxChange = (item: string, itemName: String) => {
    console.log("item", item,itemName,itemName === "workItemType");
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
        setSelectedItemsWorkItemType(selectedItemsWorkItemType.filter((i) => i !== item));
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

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    
  };


   useEffect(()=> {
    onchangeTreeData();
   },[])


const onchangeTreeData = () => {
  console.log("ocnChangeTreeData");
  const createNode = (title: any,disabled:any= false, key: any, rest: any, children?: any) => {
    console.log("rest",rest);
    
    return {  title : (
      <>
              <div>
      <div className= {disabled ? "":isMigrated ? "show-workItem-checkbox": ""}>{title}</div>  {rest?.['Workitem Id']  && rest?.['Busniess Survey Id'] === rest?.['Busniess Survey Id'] &&  <Tooltip title= {rest?.['Busniess Survey Name']} trigger="hover">
      <a>hola</a>
        </Tooltip> }
      </div>
          

        
      </>
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
  const _filtertedItemArr = [
    {
        "Title": "WI for TSTBC_SCO Chapter",
        "Workitem Id": "d700ccec-0b64-ee11-8df0-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "",
        "Description": "",
        "Priority": "",
        "Resource": "",
        "Design Classification": "",
        "Module": "",
        "GapFit": "",
        "ISV": "",
        "Complexity": "",
        "Build estimate (hrs)": "",
        "WorkItem Type": "Epic",
        "Acceptance Criteria": "",
        "Devops Id": "",
        "Import Chapter Response": "",
        "Import Section Response": "",
        "Freetext1": "",
        "Freetext2": "",
        "Functional Area": "",
        "Iteration": "",
        "Moscow": "",
        "Phase": "",
        "ReqId": "",
        "IsDefault": "true",
        "Workitem Response Id": "81e5224b-e281-ee11-8179-6045bdd2c665",
        "Busniess Survey Id": "73e5224b-e281-ee11-8179-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPSBC - Sri Lanka"
    },
    {
        "Title": "WI for TSTBC_SCO_SCO Section",
        "Workitem Id": "22ee5c06-0c64-ee11-8df0-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "81e5224b-e281-ee11-8179-6045bdd2c665",
        "Description": "",
        "Priority": "",
        "Resource": "",
        "Design Classification": "",
        "Module": "",
        "GapFit": "",
        "ISV": "",
        "Complexity": "",
        "Build estimate (hrs)": "",
        "WorkItem Type": "Feature",
        "Acceptance Criteria": "",
        "Devops Id": "",
        "Import Chapter Response": "",
        "Import Section Response": "",
        "Freetext1": "",
        "Freetext2": "",
        "Functional Area": "",
        "Iteration": "",
        "Moscow": "",
        "Phase": "",
        "ReqId": "",
        "IsDefault": "true",
        "Workitem Response Id": "85e5224b-e281-ee11-8179-6045bdd2c665",
        "Busniess Survey Id": "73e5224b-e281-ee11-8179-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPSBC - Sri Lanka"
    },
    {
        "Title": "Work Item to Test Doc Output Text Grid Response and Partner Notes",
        "Workitem Id": "",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "",
        "Description": "",
        "Priority": "1",
        "Resource": "",
        "Design Classification": "",
        "Module": "",
        "GapFit": "Fit",
        "ISV": "",
        "Complexity": "5 - Very High",
        "Build estimate (hrs)": "",
        "WorkItem Type": "User Story",
        "Acceptance Criteria": "",
        "Devops Id": "7457",
        "Import Chapter Response": "",
        "Import Section Response": "",
        "Freetext1": "",
        "Freetext2": "",
        "Functional Area": "",
        "Iteration": "",
        "Moscow": "",
        "Phase": "",
        "ReqId": "",
        "IsDefault": "false",
        "Workitem Response Id": "5e8c3cfa-57b2-42e0-8bba-7d4e958074e5",
        "Busniess Survey Id": "73e5224b-e281-ee11-8179-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPSBC - Sri Lanka"
    }
]
  console.log("_filtertedItemArr", _filtertedItemArr);

  const isMigrated = _filtertedItemArr?.some((item:any)=> item?.['Devops Id'] !== "")
  const treeData = _filtertedItemArr.map((item: any) => {
    
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

  setTreeData(_filteredTreeData)
  
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
  const extractProperties = (arr: any) => {
    return arr.reduce(
      (acc: any, item: any) => {
        if (item.rest) {
          item.rest?.Phase !== undefined && acc?.Phase.push(item.rest.Phase);
          item.rest?.Moscow !== undefined && acc?.Moscow.push(item.rest.Moscow);
          item.rest?.Module !== undefined &&acc?.Module.push(item.rest?.Module);
          item.rest?.['Work item type'] !== undefined && acc?.workItemType.push(item.rest?.['Work item type']);
        }
        if (item.children && item.children.length > 0) {
          const childResults = extractProperties(item.children);
          item.rest?.Phase !== undefined &&
            acc?.Phase.push(...childResults.Phase);
          item.rest?.Moscow !== undefined &&
            acc?.Moscow.push(...childResults.Moscow);
          item.rest?.Module !== undefined &&
            acc?.Module.push(...childResults.Module);
            item.rest?.['Work item type']  !== undefined &&
            acc?.workItemType.push(...childResults.workItemType);
        }
        return acc;
      },
      {
        Phase: [],
        Moscow: [],
        Module: [],
        workItemType:[]
      }
    );
  };

  const results = extractProperties(TreeViewData);
  console.log("results", results);

  const handleSearch = () => {
    const filters = {
      Phase: selectedItemsPhase,
      Moscow: selectedItemsMoscow,
      Module: selectedItemsModule,
      workItemType:selectedItemsWorkItemType
      // Example filter for Phase, change as needed
  };
  const findTree = (nodes:any, filters:any) => {
      const filteredNodes = nodes.filter((node:any) => {
          const Phase = node?.rest?.Phase;
          const Moscow = node?.rest?.Moscow;
          const Module = node?.rest?.Module;
          const workItemType = node?.rest?.['Work item type'];
          if (filters?.Phase && filters.Phase.includes(Phase)) {
              return true; // Include the node if it matches the filter
          }
          if (filters?.Moscow && filters.Moscow.includes(Moscow)) {
              return true; // Include the node if it matches the filter
          }
          if (filters?.Module && filters.Module.includes(Module)) {
              return true; // Include the node if it matches the filter
          }
          if (filters?.workItemType && filters.workItemType.includes(workItemType)) {
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
  console.log("filters",filters);
  const filteredTree = findTree(TreeViewData, filters);
  console.log("searcArr",filteredTree);
  
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    setSelectedNodes(info?.checkedNodes);
  };


  const exapandedAll = (isexpand:any)=> {
    console.log("state",isexpand);
   if(isexpand){
    const  expandKey=  TreeViewData.map((node:any)=> node.key)
   console.log("expandKey",expandKey);
   
    setExpandedKeys(expandKey)
   }else{
    setExpandedKeys([])
   }
  }
  const handleLanguege =async (language:any)=> {
    console.log("language",language);
    
    await i18n.changeLanguage(language)
  }
  console.log("transt",Trans);
  
  return (
     <div>
{/*      
       <ButtonGroup>
                {["en", "es", "de", "fr", "nl", "pt-BR"].map((language) => (
                  <Button
                    key={language}
                    onClick={()=> {clickMe(language)}}
                    className={i18n.language === language ? "primary" : "outline-primary"}
                  >
                    {language}
                  </Button>
                ))}
              </ButtonGroup> */}
        <ConnectionContainer/>   
      

    
     {/* <div style={{ display: "flex" }}>
       {Object.entries(results).map(([key, value]) => {
          console.log("key,value", key, value);
          return (
            <>
              {" "}
              <MultiSelectComponentProps
                itemName={key}
                treeData={value}
                handleCheckboxChange={handleCheckboxChange}
                selectedItems={
                  key === "Moscow"
                    ? selectedItemsMoscow
                    : key === "Phase"
                    ? selectedItemsPhase
                    : key === "Module"
                    ? selectedItemsModule
                    : []
                }
              />
            </>
          );
        })} 

<Checkbox className="workitem-checkbox ">Show new work items</Checkbox>
           
            <Tree
            checkable
            onExpand={onExpand}
           // defaultExpandAll={isExpandAll}
            defaultCheckedKeys={[...selectedKeys]}
            expandedKeys={[...expandedKeys]}
            // onSelect={onSelect}
            checkStrictly={true}
            selectable={false}
            onCheck={onCheck}
            treeData={treeData}
          />

        </div>  */}
        {/* <div>



   

    </div> 

  <MultiSelectComponentProps
                itemName={"Moscow"}
                treeData={results?.Moscow.length ?results?.Moscow :  [] }
                handleCheckboxChange={handleCheckboxChange}
                selectedItems={selectedItemsMoscow?.length ? selectedItemsMoscow :[]
                }
              />
             {results?.Phase.length &&  <div className="multiSelectDropDown">
              <MultiSelectComponentProps
                itemName={"Phase"}
                treeData={results?.Phase.length ? results?.Phase : []}
                handleCheckboxChange={handleCheckboxChange}
                selectedItems={
                  selectedItemsPhase?.length ? selectedItemsPhase : []
                }
              />
            </div>}  
              <MultiSelectComponentProps
                itemName={"Module"}
                treeData={results?.Module.length ?results?.Module :  [] }
                handleCheckboxChange={handleCheckboxChange}
                selectedItems={selectedItemsModule?.length ? selectedItemsModule :[]
                }
              />
              {  <div className="multiSelectDropDown">
              <MultiSelectComponentProps
                itemName={"workItemType"}
                treeData={results?.workItemType.length ? results?.workItemType : []}
                handleCheckboxChange={handleCheckboxChange}
                selectedItems={
                  selectedItemsWorkItemType?.length ? selectedItemsWorkItemType : []
                }
              />
            </div>}  
            <Button
              type="primary"
              style={{ marginLeft: "2rem" }}
              onClick={handleSearch}
            >
              Apply
            </Button>

            <div className="">


            <Button onClick={()=> {
            exapandedAll(false)
          }}>expandedALl</Button>
          <Button onClick={()=> {
            exapandedAll(true)
          }}>unexp</Button>
             

             <Checkbox className="workitem-checkbox ">Show new work items</Checkbox>
            </div>

            <Tree
            checkable
            onExpand={onExpand}
           // defaultExpandAll={isExpandAll}
            defaultCheckedKeys={[...selectedKeys]}
            expandedKeys={[...expandedKeys]}
            // onSelect={onSelect}
            checkStrictly={true}
            selectable={false}
            onCheck={onCheck}
            treeData={TreeViewData}
          />

   

    </div> */}
    </div>
  );
};

export default App;
