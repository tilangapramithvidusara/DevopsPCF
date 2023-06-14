import React from 'react'
import TableComponent from '../Components/TableComponent';
import PopupComponent from '../Components/PopupComponent';
import ConnectionComponent from '../Components/ConnectionComponent';

export default function ConnectionContainer() {
  const dataSource = [
    { key: '1', name: 'John Doe', age: 32, country: 'USA', mapping: "Mapping", fixed: true, enable: false  }, // info: 'Additional info for John Doe',
    { key: '2', name: 'Jane Smith', age: 28, country: 'Canada', mapping: "Mapping", enable: true }, // info: 'Additional info for Jane Smith'
    { key: '3', name: 'John Smith', age: 38, country: 'UK', mapping: "Mapping", enable: false  }, //info: 'Additional info for Jhon Smith'
  ];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age', textField: true },
    { title: 'Country', dataIndex: 'country', key: 'country', dropdownOptions: ['USA', 'Canada', 'UK'] },
    { title: 'Mapping', dataIndex: 'mapping', key: 'mapping' , buttonField: true}, // accordionContent: 'Additional info'
  ];
  return (
    <div>
      <h2>My Component</h2>
      <ConnectionComponent/>
      <TableComponent dataSource={dataSource} columns={columns} onMapping={() => {}} />
      {/* <TableComponent dataSource={dataSource} columns={columns} />
      <PopupComponent 
        visible={true} 
        onClose={function (): void {
          throw new Error('Function not implemented.');
        } } 
        buttons={[{title: "Cancel", onClickHandler: ""}, {title: "Save", onClickHandler: ""}]} 
        Content={ <TableComponent dataSource={dataSource} columns={columns} />} 
      /> */}
    </div>
  )
}
