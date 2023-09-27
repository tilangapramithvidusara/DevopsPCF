import { Button, Checkbox, Tree, TreeProps } from "antd";
import React, { useEffect, useState } from "react";
import { TreeViewData } from "./Constants/Samples/sample";
import MultiSelectComponentProps from "./DevopsTree/Components/MultiSelectComponent";
import ConnectionContainer from "./Features/ConnectionContainer";

export interface AppConfig {
  apiKey: string;
  apiEndpoint: string;
}

interface AppProps {
  config: AppConfig;
}

const App: React.FC<AppProps> = ({ config }) => {
  console.log("configv ======> ", config);

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
  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);
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
  
  return (
     <div>
      <ConnectionContainer/> 
    {/* //  <div style={{ display: "flex" }}> */}
        {/* {Object.entries(results).map(([key, value]) => {
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
        })} */}
        {/* <div>

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
