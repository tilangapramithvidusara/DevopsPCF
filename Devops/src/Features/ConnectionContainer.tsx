import React, { useEffect, useState } from 'react'
import { Button,notification} from 'antd';
import TableComponent from '../Components/TableComponent';
import PopupComponent from '../Components/PopupComponent';
import ConnectionComponent from '../Components/ConnectionComponent';
import  {exampleCRMData, exampleDevOpsData, workItemTypes}  from '../Constants/Samples/sample';
import SampleModel from '../Components/SampleMode';
import { FetchCrmFields } from '../Api/crmApis';
import { fetchWorkItemTypesFromCRM, fetchWorkItemTypesFromDevops, fetchDevopsFeildsData  } from '../Api/devopsApis';

export default function ConnectionContainer() {
  const dataSource = [
    { key: '1', name: 'Issue', gyde_name: 'N/A', mapping: "Mapping", enable: false  }, // info: 'Additional info for John Doe',
    { key: '2', name: 'Epic', gyde_name: 'Epic', mapping: "Mapping", enable: true }, // info: 'Additional info for Jane Smith'
    { key: '3', name: 'Task', gyde_name: 'Task', mapping: "Mapping", enable: true  }, //info: 'Additional info for Jhon Smith'
    { key: '4', name: 'Test Case', gyde_name: 'Test Case', mapping: "Mapping", enable: true  },
    { key: '5', name: 'Test Plan', gyde_name: 'Test Plan', mapping: "Mapping", enable: true  },
    { key: '6', name: 'Test Suite', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '7', name: 'Shared Steps', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '8', name: 'Shared Parameter', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '9', name: 'Code Review Request', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '10', name: 'Code Review Response', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '11', name: 'Feedback Request', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '12', name: 'Feedback Response', gyde_name: '', mapping: "Mapping", enable: false  },
  ];

  const [devopsWorkItemTypes , setDevopsWorkItemTypes] = useState<any>([]);
  const [crmWorkItemTypes , setCrmWorkItemTypes] = useState<any>([]);
  const options : any = [...devopsWorkItemTypes];  //"N/A"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDataArr, setTaskDataArr] : any = useState([]);
  const [tableColumn, setColumns] = useState<any>([]);
  const [selectedWorkItem, setSelectedWorkItem] = useState<any>();

  const dataSource1 = crmWorkItemTypes?.map((item:any,num:number)=> {
    console.log("devopsWorkItemTypes[num] :",devopsWorkItemTypes[num]);
    console.log("item?.gyde_name[num] :",item?.gyde_name);
    console.log("logic build :",devopsWorkItemTypes?.find((res:any)=>res == item?.gyde_name)?.gyde_name);
    return{
      key:num,
      name:item,
      gyde_name:devopsWorkItemTypes?.find((res:any)=>res == item?.gyde_name)?.gyde_name,
      mapping:"Mapping",
      enable:devopsWorkItemTypes?.find((res:any)=>res == item?.gyde_name)?.gyde_name == item ? true : false 
    }
  });
  
  const showModal = () => {
    setIsModalOpen(true);
    apiRequest();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("clikkkkk");
    
    setIsModalOpen(false);
  };

   
  const workItemColumns = [
    { title: 'SOURCE WORK ITEM TYPE', dataIndex: 'name', key: 'name' },
    { title: 'DEVOPS TARGET WORK ITEM TYPE', dataIndex: 'gyde_name', key: 'country', dropdownOptions: options },
    { title: 'FIELD MAPPINGS', dataIndex: 'mapping', key: 'mapping' , buttonField: true}, // accordionContent: 'Additional info'
  ];

  useEffect(() => {

    //tempAPI();
  //apiRequest();
  } ,[])

  const apiRequest = async()=>{

     const devopsData = await fetchDevopsFeildsData(selectedWorkItem?.name);
     console.log("apiDara,",devopsData);
     const crmData =   await FetchCrmFields();
     
     if(devopsData.status === 'success' && crmData.status === 'success' ){
      console.log("crm",crmData);
    

      let tableData = crmData?.data.map((crm:any,key:any) =>   {
       
        let dropdownArr:any  =devopsData?.data?.Value.filter((devOps:any) => crm.AttributeType === devOps.attributeType ).map((_data:any) => {
       return   {dropdownValue:_data.fieldName,option:_data.hasPicklist && crm.hasPicklist ? _data.allowedValues : [],isPickList:_data.hasPicklist ? true: false}
        })
       
       // console.log("x5555)
         return { key:key,sourceWorkItem:crm.SchemaName,dropdown:[...dropdownArr], mapping: "", enable: "" }
      })
      console.log("devopsData",tableData);
      setTaskDataArr(tableData)
      
      const columns = [
        { title: 'SOURCE WORK ITEM TYPE', dataIndex: 'sourceWorkItem', key: 'sourceWorkItem' },
        { title: 'DEVOPS TARGET WORK ITEM TYPE', dataIndex: 'devopsWorkItem', key: 'devopsWorkItem', dropdownOptions: options },
        { title: 'FIELD MAPPINGS', dataIndex: 'mapping', key: 'mapping' , buttonField: true}, // accordionContent: 'Additional info'
      ];
  
      setColumns(columns);
     }else if(devopsData.status === 'error' || crmData.status === 'error'){

  
      notification.error({message:devopsData.data,type:'error'})
       
     }
   

   
  }

  const tempAPI = ()=> {

 
    const tempArr = [{name:'Issue',country: 'Epic1',AttributeType: "Lookup" ,hasPicklist:false ,option:[1,2,4] },
    {name:'Epic',country: 'Epic', AttributeType: "Lookup",hasPicklist:true ,option:[1,2,4]},
    {name:'Test Plan',country: 'Test Plan', AttributeType: "String",hasPicklist:true ,option:[1,2,4]}]
    const dataSourcew = [
      { key: '1', name: 'Issue', age: 32, country: 'N/A', mapping: "Mapping", enable: false ,AttributeType: "Lookup" }, // info: 'Additional info for John Doe',
    { key: '2', name: 'Epic', age: 28, country: 'Epic', mapping: "Mapping", enable: true ,AttributeType: "Lookup"}, // info: 'Additional info for Jane Smith'
    { key: '3', name: 'Epic', age: 38, country: 'Task', mapping: "Mapping", enable: true ,AttributeType: "a" }, //info: 'Additional info for Jhon Smith'
    { key: '4', name: 'Test Case', age: 38, country: 'Test Case', mapping: "Mapping", enable: true  ,AttributeType: "String" },
    { key: '5', name: 'Test Plan', age: 38, country: 'Test Plan', mapping: "Mapping", enable: true  ,AttributeType: "String" },
    ] 

    let tableData = exampleCRMData.map((crm,key) =>   {
      let dropdownArr:any = []
      let picklistArr:any = []
      let x:any  =exampleDevOpsData.filter(devOps => crm.AttributeType === devOps.attributeType ).map(_data => {
        dropdownArr.push({dropdownValue:_data.fieldName,option:_data.hasPicklist ? _data.allowedValues : [],isPickList:_data.hasPicklist ? true: false})
      })
     
      console.log("x5555",x,crm.SchemaName)
       return { key:key,name:crm.SchemaName,dropdown:[...dropdownArr], mapping: "", enable: "" }
    })


    let xx = dataSourcew.map((f,key) =>   {
      let dropdownArr:any = []
      let picklistArr:any = []
      let x:any  =tempArr.filter(_f => f.AttributeType === _f.AttributeType ).map(_data => {
       //dropdownArr.push({dropdownValue:_data.country,option:_data.hasPicklist ? _data.option : [],isPickList:_data.hasPicklist ? true: false})
       return {dropdownValue:_data.country,option:_data.hasPicklist ? _data.option : [],isPickList:_data.hasPicklist ? true: false}
      })
     
      console.log("x5555",x,f.name)
       return { key:key,name:f.name,dropdown:[...x], mapping: "", enable: "" }
    })


  console.log("tableData",tableData);
                   
  
     console.log("_tem1_tem14",xx); 
    setTaskDataArr(xx)
  }

  useEffect(() => {
    fetchWorkItemTypesFromDevops().then((result:any)=>{
      console.log(" result :", result);
      setDevopsWorkItemTypes(result?.data?.Value);
      
    }).catch((err)=>{
      console.log("error...", err);
    });
  } ,[])

  console.log(" devopsWorkItemTypes :", devopsWorkItemTypes);
  console.log("dataSource",dataSource);
  useEffect(()=>{
    fetchWorkItemTypesFromCRM().then((result:any)=>{
      console.log("crm work items :",result, result?.data?.value);
      setCrmWorkItemTypes(result?.data?.value);
    });
  },[])

  
  return (
    <div className="devops-container">
      <h1 className='title'>DevOps Work Items</h1>
      <h3 className='sub-title'><span>Connection Details</span><span> <h5 className='sub-title2'> Survey Name - Business Name</h5></span></h3>
      <ConnectionComponent setWorkItemData={(res:any)=>setDevopsWorkItemTypes(res?.data?.Value)}/>
      {devopsWorkItemTypes?.length > 0 && (
        <>
          <h3 className='sub-title'>Mapping - Work Item Types</h3>
          <TableComponent 
            dataSource={dataSource}  
            columns={workItemColumns} 
            onMapping={() => {}}  
            size='small'
            scroll={{ y: 300 }} 
            isModelopen= {false} 
            modelAction={showModal}
            setDropDownValue={(data:any)=>setSelectedWorkItem(data)}
          />
        </>
      )}
      {/* <TableComponent dataSource={dataSource} columns={columns} /> */}
      {isModalOpen  &&  <PopupComponent 
        visible={isModalOpen} onOk={handleOk} onClose={handleCancel}
         buttons={[{title: "Cancel", onClickHandler: ""}, {title: "Set as Default", onClickHandler: ""} ,{title: "Save", onClickHandler: ""}]} 
         Content={ <TableComponent 
                    dataSource={taskDataArr}  
                    columns={tableColumn} 
                    onMapping={() => {}}   
                    size='small'scroll={{ y: 300 }} 
                    modelAction={showModal} 
                    isModelopen= {isModalOpen}
                  />} 
      /> }
      <span>
        <Button className='cancel-btn' type="primary" htmlType="submit" onClick={()=>{}}>
              Cancel
            </Button>
        <Button type="primary" htmlType="submit" onClick={()=>{}}>
              Save
        </Button>
      </span>
    </div>
  )
}
