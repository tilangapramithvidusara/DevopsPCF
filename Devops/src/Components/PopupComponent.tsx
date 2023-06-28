import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  buttons: any[];
  Content: any;
  onOk: () => void;
}

// button = {title: "", onClickHandler(params), visible, onClose, styles: {width, height, color, fontColor, fontSize, fontWeight}}

const PopupComponent: React.FC<PopupProps> = ({ visible, onClose, buttons, Content,onOk }) => {

  useEffect(()=>{

    console.log("onOk",onOk);
    
  },[])
  return (
    <Modal
      open={visible}
      //  onOk={onOk}
       onCancel={onClose}
      footer={null}
      centered
      //destroyOnClose
      width={800}
    >
      <div style={{ overflowY: 'hidden', maxHeight: '300px' }}>
        {/* Content */}
        {/* ... */}
        <p>Work Item Field Mapping</p>
        {Content}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        {/* Dynamic Buttons */}
        {buttons.map((button, index) => (
          <Button key={index} onClick={() => { /* Handle button click */ }} style={{marginLeft:'5px'}}>
            {button?.title}
          </Button>
        ))}
      </div>
    </Modal>
  );
};

export default PopupComponent;
