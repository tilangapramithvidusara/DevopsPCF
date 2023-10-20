import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  buttons: any[];
  Content: any;
  onOk: () => void;
  Ispicklist?:any,
  language:any
}

// button = {title: "", onClickHandler(params), visible, onClose, styles: {width, height, color, fontColor, fontSize, fontWeight}}

const PopupComponent: React.FC<PopupProps> = ({ visible, onClose, buttons, Content,onOk,Ispicklist,language }) => {

  useEffect(()=>{
console.log("pickList",Content);

    console.log("onOk",onOk);

  },[])
  return (
    <Modal
      open={visible}
      wrapClassName='devops-container'
      //  onOk={onOk}
       onCancel={onClose}
      footer={null}
      centered
      //destroyOnClose
      //bodyStyle={{height:Ispicklist ? 335 : 600}}
      width={800}
    
    >
      <div style={{ overflowY: 'hidden', }}>
        {/* Content */}
        {/* ... */}
        <p className='modal-title'>{Ispicklist  ? language?.DevOpsConfiguration_FieldMappingTitle : language?.DevOpsConfiguration_WorkItemFieldMappingTitle}</p>
        {Content}
      </div>


    </Modal>
  );
};

export default PopupComponent;

{/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
{/* Dynamic Buttons  */}

//</div> 
// {buttons.map((button, index) => (
//   <Button className='ant-btn-primary' key={index} onClick={(e) => { button.onClickHandler()/* Handle button click */ }} style={{marginLeft:'5px'}}>
//     {button?.title}
//   </Button>
// ))}

