import { Button, Checkbox, Radio, Spin, Tooltip, Tree, TreeProps } from "antd";
import React, { useEffect, useState } from "react";
import { TreeViewData } from "./Constants/Samples/sample";
import MultiSelectComponentProps from "./DevopsTree/Components/MultiSelectComponent";
import ConnectionContainer from "./Features/ConnectionContainer";
import { Trans, useTranslation } from "react-i18next";
import ButtonGroup from 'antd/es/button/button-group';

import "./i18n";
import { savedMappingData } from "./Constants/Samples/workItemData";
export interface AppConfig {
  apiKey: string;
  apiEndpoint: string;
}

interface AppProps {
  config?: AppConfig;
  context:any
}

const App: React.FC<AppProps> = ({ config ,context}) => {
  console.log("configv ======> ", config);
  const { i18n } = useTranslation();
  const url = new URL(window.location.href);
  
  console.log("props.pcfContext.userSettings",context);
    
  console.log("props.pcfContext.userSettings",context?.userSettings?.formatInfoCultureName);
  
  
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
  const [currentSelectedNodes, setCurrentSelectedNodes] = useState<any>([]);
  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);


   useEffect(()=> {
    handleLanguege(context?.userSettings?.formatInfoCultureName)
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
        "Title": "PDIR01_C01_S02_Q02 WI01",
        "Workitem Id": "72f87fbb-bd82-ee11-8179-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "a8309d50-62f0-5264-839d-ca4d3575f9b9",
        "Description": "",
        "Priority": "",
        "Resource": "",
        "Design Classification": "",
        "Module": "",
        "GapFit": "",
        "ISV": "",
        "Complexity": "",
        "Build estimate (hrs)": "",
        "WorkItem Type": "User Story",
        "Acceptance Criteria": "",
        "Devops Id": "",
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "9ae92629-377d-5f17-b442-92daf1f8ee6c"
    },
    {
        "Title": "PDIR01_C01_S01_Q02 WI01",
        "Workitem Id": "3696e09a-bc82-ee11-8179-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "cae67817-97b9-5e2b-b2e1-1bb3e5329411",
        "Description": "",
        "Priority": "",
        "Resource": "",
        "Design Classification": "",
        "Module": "",
        "GapFit": "",
        "ISV": "",
        "Complexity": "",
        "Build estimate (hrs)": "",
        "WorkItem Type": "User Story",
        "Acceptance Criteria": "",
        "Devops Id": "",
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "d77fa3a8-2753-57a3-b1b0-ad6d974629aa"
    },
    {
        "Title": "PDIR01_C01_S02 WI01",
        "Workitem Id": "aed5707c-bc82-ee11-8179-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "9dc56cc3-ff96-515b-b0f1-7818824983f9",
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
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "a8309d50-62f0-5264-839d-ca4d3575f9b9"
    },
    {
        "Title": "PDIR01_C02_S01 WI01",
        "Workitem Id": "7c8919f2-bc82-ee11-8179-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "9181a54f-018d-5e21-ae96-d4d51611a9c7",
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
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "dcdd73fa-aa35-569a-8923-d28fb0b2df44"
    },
    {
        "Title": "PDIR01_C02 WI01",
        "Workitem Id": "d8988de0-bc82-ee11-8179-002248079177",
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
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "9181a54f-018d-5e21-ae96-d4d51611a9c7"
    },
    {
        "Title": "PDIR01_C02_S01_Q01 WI01",
        "Workitem Id": "08e01803-bd82-ee11-8179-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "dcdd73fa-aa35-569a-8923-d28fb0b2df44",
        "Description": "",
        "Priority": "",
        "Resource": "",
        "Design Classification": "",
        "Module": "",
        "GapFit": "",
        "ISV": "",
        "Complexity": "",
        "Build estimate (hrs)": "",
        "WorkItem Type": "User Story",
        "Acceptance Criteria": "",
        "Devops Id": "",
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "1aca913a-d05c-5f79-8caa-d947796c15dc"
    },
    {
        "Title": "PDIR01_C02_S01_Q02 WI01",
        "Workitem Id": "88d71816-bd82-ee11-8179-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "dcdd73fa-aa35-569a-8923-d28fb0b2df44",
        "Description": "",
        "Priority": "",
        "Resource": "",
        "Design Classification": "",
        "Module": "",
        "GapFit": "",
        "ISV": "",
        "Complexity": "",
        "Build estimate (hrs)": "",
        "WorkItem Type": "User Story",
        "Acceptance Criteria": "",
        "Devops Id": "",
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "31b59e97-0f2a-5fdf-8b79-52ae7fd301f3"
    },
    {
        "Title": "PDIR01_C01_S02_Q01 WI01",
        "Workitem Id": "a99390b4-bc82-ee11-8179-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "a8309d50-62f0-5264-839d-ca4d3575f9b9",
        "Description": "",
        "Priority": "",
        "Resource": "",
        "Design Classification": "",
        "Module": "",
        "GapFit": "",
        "ISV": "",
        "Complexity": "",
        "Build estimate (hrs)": "",
        "WorkItem Type": "User Story",
        "Acceptance Criteria": "",
        "Devops Id": "",
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "b9d55649-199a-51a3-8788-4a2251d3d6e2"
    },
    {
        "Title": "PDIR01_C01_S01 WI01",
        "Workitem Id": "07d36e2d-bb82-ee11-8179-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "9dc56cc3-ff96-515b-b0f1-7818824983f9",
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
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "cae67817-97b9-5e2b-b2e1-1bb3e5329411"
    },
    {
        "Title": "PDIR01_C01 WI01",
        "Workitem Id": "56a8f475-ba82-ee11-8179-002248079177",
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
        "Devops Id": "110",
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "9dc56cc3-ff96-515b-b0f1-7818824983f9"
    },
    {
        "Title": "PDIR01_C01_S01_Q01 WI01",
        "Workitem Id": "3fe53d5d-bb82-ee11-8179-002248079177",
        "Sequance": "",
        "Sequance Id": "",
        "Parent Work Item": "cae67817-97b9-5e2b-b2e1-1bb3e5329411",
        "Description": "",
        "Priority": "",
        "Resource": "",
        "Design Classification": "",
        "Module": "",
        "GapFit": "",
        "ISV": "",
        "Complexity": "",
        "Build estimate (hrs)": "",
        "WorkItem Type": "User Story",
        "Acceptance Criteria": "",
        "Devops Id": "",
        "Busniess Survey Id": "5f32afe4-c887-ee11-be36-6045bdd2c665",
        "Busniess Survey Name": "Isuru's Customer - ENPD01 - Australia",
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
        "Workitem Response Id": "33b1ba26-9bb9-548b-9c56-3a6b54837e61"
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
          item.rest?.['WorkItem Type'] !== undefined && acc?.workItemType.push(item.rest?.['WorkItem Type']);
        }
        if (item.children && item.children.length > 0) {
          const childResults = extractProperties(item.children);
          item.rest?.Phase !== undefined &&
            acc?.Phase.push(...childResults.Phase);
          item.rest?.Moscow !== undefined &&
            acc?.Moscow.push(...childResults.Moscow);
          item.rest?.Module !== undefined &&
            acc?.Module.push(...childResults.Module);
            item.rest?.['WorkItem Type']  !== undefined &&
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

  const results = extractProperties(treeData);
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
          const workItemType = node?.rest?.['WorkItem Type'];
          if (filters?.Phase && filters.Phase.includes(Phase)) {
            node.title = "hola"; 
              return true; // Include the node if it matches the filter
          }
          if (filters?.Moscow && filters.Moscow.includes(Moscow)) {
              return true; // Include the node if it matches the filter
          }
          if (filters?.Module && filters.Module.includes(Module)) {
              return true; // Include the node if it matches the filter
          }
          if (filters?.workItemType && filters.workItemType.includes(workItemType)) {
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
  console.log("filters",filters);
  const filteredTree = findTree(treeData, filters);
  console.log("searcArr",filteredTree);
setTreeData([])
  setTreeData(filteredTree)
  
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("check",info, "info?.checkedNodes",info?.checkedNodes ,"checkedKeys",checkedKeys);
    
    setSelectedNodes(info?.checkedNodes);
    const filterNodesByCheckedKeys = (node :any, checkedKeys:any, filterFunction:any) => {
      const isNodeIncluded = filterFunction(node, checkedKeys);
  
      if (isNodeIncluded) {
          return {
              ...node,
              children: node.children?.map((child:any) => filterNodesByCheckedKeys(child, checkedKeys, filterFunction)).filter(Boolean),
          };
      }
  
      else{
        return null
      }
  };
      
    const genericFilterFunction = (node :any, checkedKeys :any) => checkedKeys.includes(node.key);
    let checkedKeysNode :any =checkedKeys;
    const checkedKeysResult = checkedKeysNode?.checked;
    const filteredArray = treeData
        ?.map((item:any) => filterNodesByCheckedKeys(item, checkedKeysResult, genericFilterFunction))
        .filter(Boolean);
    
    console.log("filteredTree", filteredArray);
    
   


  
  console.log("setCurrentSelectedNodes",filteredArray);

  

  
  setCurrentSelectedNodes(filteredArray)
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
    
    await i18n.changeLanguage(language === "1033" ? 'en' :language === "1046" ? 'pt-BR':'en')
  }
  console.log("transt",Trans);
  

  const handleMigrateToDevops = async () => {
    console.log("handleMigrateToDevopsx",currentSelectedNodes);
    
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
    const nodesToMap = selectedNodes?.length ? currentSelectedNodes : flattenedData;
    console.log("flattenedData", nodesToMap);
    const allNodes = nodesToMap.map((item: any) => {
      let fieldsWithReferncePAth = savedMappingData?.map(
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
      surveyId: 'cbsId',
      businessSurveyId: 'cusbSurveyId',
      userId: 'window?.parent?.userId',
      data: modifiedArr,
    };

    console.log("obj", obj);

    
  };
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
       
  {/* {treeData?.length ? <>


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
            selectable={true}
            onCheck={onCheck}
            treeData={treeData}
          />
          <Button
              type="primary"
              htmlType="button"
              onClick={handleMigrateToDevops}
              style={{ marginTop: 10 }}
            > <Trans>DevOpsTree_MigrateTitle</Trans> </Button>
</> : <Spin/>}   */}

   

  

    
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
