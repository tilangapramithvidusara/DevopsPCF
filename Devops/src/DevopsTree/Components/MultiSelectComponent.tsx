import React, { useEffect, useState } from 'react';
import { Dropdown, Menu, Checkbox, Button, Space, Empty } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TreeViewData } from '../../Constants/Samples/sample';
import { MenuProps } from 'rc-menu';


interface MultiSelectComponentProps {
  treeData:any,
  itemName:any,
  handleCheckboxChange:any
  selectedItems:any
}
const MultiSelectComponent :React.FC <MultiSelectComponentProps>  = ({treeData,itemName,handleCheckboxChange,selectedItems}) => {
 // const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  // const handleCheckboxChange = (item: string) => {
  //   if (selectedItems.includes(item)) {
  //     setSelectedItems(selectedItems.filter((i) => i !== item));
  //   } else {
  //     setSelectedItems([...selectedItems, item]);
  //   }
  // };
//   useEffect(()=> {

// console.log("selectedItems",selectedItems);

//   },[selectedItems])
 console.log("treeData",treeData,itemName);
 console.log("itemSelected",selectedItems);

  const isAllempty =  treeData?.every((item:any) => item === '')
  const uniqueData:any = Array.from(new Set(treeData));
 console.log("uniqueData",uniqueData);
 
 const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      isAllempty ?  <Empty /> :
      <Menu>
      {uniqueData.map((item: string, index: number) => (
        item !== '' &&  <Menu.Item key={index.toString()}>
        <Checkbox
          checked={selectedItems.includes(item)}
          onChange={() => handleCheckboxChange(item,itemName)}
        >
          {item}
        </Checkbox>
      </Menu.Item>
      ))}
    </Menu>
    ),
  },
]

  // const menu:any = (
  //   <Menu>
  //     {treeData.map((item: string, index: number) => (
  //       <Menu.Item key={index.toString()}>
  //         <Checkbox
  //           checked={selectedItems.includes(item)}
  //           onChange={() => handleCheckboxChange(item,itemName)}
  //         >
  //           {item}
  //         </Checkbox>
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // );

  return (
    <Dropdown
      menu={{ items }}
      onOpenChange={handleVisibleChange}
      open={visible}
      className='multi-select-dropdown'
    >
      <Button>
       <a> {itemName}</a><DownOutlined  className='arrow-icon'/> <img src={selectedItems?.length  ? '/filledfilter.png' :'/outlinefilter.png'} alt="icon" className="icon"/> 
      </Button>
      
    </Dropdown>
  );
};

export default MultiSelectComponent;
