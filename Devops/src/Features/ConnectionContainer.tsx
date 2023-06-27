import React, { useEffect, useState } from 'react'
import { Button,} from 'antd';
import TableComponent from '../Components/TableComponent';
import PopupComponent from '../Components/PopupComponent';
import ConnectionComponent from '../Components/ConnectionComponent';
import { fetchWorkItemTypesFromCRM, fetchWorkItemTypesFromDevops, postReq4, postReq5 } from '../Api/devopsApis';

export default function ConnectionContainer() {
  const dataSource = [
    { key: '1', name: 'Issue', age: 32, gyde_name: 'N/A', mapping: "Mapping", enable: false  }, // info: 'Additional info for John Doe',
    { key: '2', name: 'Epic', age: 28, gyde_name: 'Epic', mapping: "Mapping", enable: true }, // info: 'Additional info for Jane Smith'
    { key: '3', name: 'Task', age: 38, gyde_name: 'Task', mapping: "Mapping", enable: true  }, //info: 'Additional info for Jhon Smith'
    { key: '4', name: 'Test Case', age: 38, gyde_name: 'Test Case', mapping: "Mapping", enable: true  },
    { key: '5', name: 'Test Plan', age: 38, gyde_name: 'Test Plan', mapping: "Mapping", enable: true  },
    { key: '6', name: 'Test Suite', age: 38, gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '7', name: 'Shared Steps', age: 38, gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '8', name: 'Shared Parameter', age: 38, gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '9', name: 'Code Review Request', age: 38, gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '10', name: 'Code Review Response', age: 38, gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '11', name: 'Feedback Request', age: 38, gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '12', name: 'Feedback Response', age: 38, gyde_name: '', mapping: "Mapping", enable: false  },
  ];

  const [devopsWorkItemTypes , setDevopsWorkItemTypes] = useState<any>([]);
  // const [data , setData] = useState([dataSource]);
  const [crmWorkItemTypes , setCrmWorkItemTypes] = useState<any>([]);
  const options : any = [...devopsWorkItemTypes,"N/A"];

  const dataSource1 = crmWorkItemTypes?.map((item:any,num:number)=> {
    console.log("devopsWorkItemTypes[num] :",devopsWorkItemTypes[num]);
    console.log("item?.gyde_name[num] :",item?.gyde_name);
    return{
      key:num,
      name:devopsWorkItemTypes[num],
      workItem:item?.gyde_name,
      enable:devopsWorkItemTypes[num] == item?.gyde_name ? true : false 
    }
  });
 
  const columns = [
    { title: 'SOURCE WORK ITEM TYPE', dataIndex: 'gyde_name', key: 'name' },
    { title: 'DEVOPS TARGET WORK ITEM TYPE', dataIndex: 'gyde_name', key: 'country', dropdownOptions: options },
    { title: 'FIELD MAPPINGS', dataIndex: 'mapping', key: 'mapping' , buttonField: true}, // accordionContent: 'Additional info'
  ];

  useEffect(() => {
    // postReq();
    // postReq3();
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
      console.log("crm work items :",result, result?.value);
      setCrmWorkItemTypes(result?.value);
    });
  },[])

  return (
    <div className="devops-container">
      <h1 className='title'>DevOps Work Items</h1>
      <h3 className='sub-title'><span>Connection Details</span><span> <h5 className='sub-title2'> Survey Name - Business Name</h5></span></h3>
      <ConnectionComponent/>
      <h3 className='sub-title'>Mapping - Work Item Types</h3>
      <TableComponent dataSource={dataSource}  columns={columns} onMapping={() => {}}   size='small'scroll={{ y: 300 }}/>
      {/* <TableComponent dataSource={dataSource} columns={columns} />
      <PopupComponent 
        visible={true} 
        onClose={function (): void {
          throw new Error('Function not implemented.');
        } } 
        buttons={[{title: "Cancel", onClickHandler: ""}, {title: "Save", onClickHandler: ""}]} 
        Content={ <TableComponent dataSource={dataSource} columns={columns} />} 
      /> */}
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
