import React, { useEffect, useState } from 'react'
import { Button,} from 'antd';
import TableComponent from '../Components/TableComponent';
import PopupComponent from '../Components/PopupComponent';
import ConnectionComponent from '../Components/ConnectionComponent';
import { getReq, postReq } from '../Api/devopsApis';
import  { workItemTypes}  from '../Constants/Samples/sample';

export default function ConnectionContainer() {
  const dataSource = [
    { key: '1', name: 'Issue', age: 32, country: 'N/A', mapping: "Mapping", enable: false  }, // info: 'Additional info for John Doe',
    { key: '2', name: 'Epic', age: 28, country: 'Epic', mapping: "Mapping", enable: true }, // info: 'Additional info for Jane Smith'
    { key: '3', name: 'Task', age: 38, country: 'Task', mapping: "Mapping", enable: true  }, //info: 'Additional info for Jhon Smith'
    { key: '4', name: 'Test Case', age: 38, country: 'Test Case', mapping: "Mapping", enable: true  },
    { key: '5', name: 'Test Plan', age: 38, country: 'Test Plan', mapping: "Mapping", enable: true  },
    { key: '6', name: 'Test Suite', age: 38, country: '', mapping: "Mapping", enable: false  },
    { key: '7', name: 'Shared Steps', age: 38, country: '', mapping: "Mapping", enable: false  },
    { key: '8', name: 'Shared Parameter', age: 38, country: '', mapping: "Mapping", enable: false  },
    { key: '9', name: 'Code Review Request', age: 38, country: '', mapping: "Mapping", enable: false  },
    { key: '10', name: 'Code Review Response', age: 38, country: '', mapping: "Mapping", enable: false  },
    { key: '11', name: 'Feedback Request', age: 38, country: '', mapping: "Mapping", enable: false  },
    { key: '12', name: 'Feedback Response', age: 38, country: '', mapping: "Mapping", enable: false  },
  ];
  const [data , setData] = useState([dataSource]);
  const options : any = [...workItemTypes,"N/A"]

  const columns = [
    { title: 'SOURCE WORK ITEM TYPE', dataIndex: 'name', key: 'name' },
    { title: 'DEVOPS TARGET WORK ITEM TYPE', dataIndex: 'country', key: 'country', dropdownOptions: options },
    { title: 'FIELD MAPPINGS', dataIndex: 'mapping', key: 'mapping' , buttonField: true}, // accordionContent: 'Additional info'
  ];

  useEffect(() => {
    postReq();
    // getReq();
  } ,[])
  return (
    <div>
      <h1>DevOps Work Items</h1>
      <h3><span>Connection Details</span><span> <h5> Survey Name - Business Name</h5></span></h3>
      <ConnectionComponent/>
      <h3>Mapping - Work Item Types</h3>
      <TableComponent dataSource={dataSource}  columns={columns} onMapping={() => {}}  changedData = {(data:any)=>setData(data)} size='small'scroll={{ y: 300 }}/>
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
        <Button type="primary" htmlType="submit" onClick={()=>{}}>
              Cancel
            </Button>
        <Button type="primary" htmlType="submit" onClick={()=>{}}>
              Save
        </Button>
      </span>
    </div>
  )
}
