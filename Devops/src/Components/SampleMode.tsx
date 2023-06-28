import React, { useState } from 'react';
import { Button, Modal } from 'antd';
interface PopupProps {
  visible: boolean;
  onClose: () => void;
  Content: any;
  onOk:  () => void;
  buttons: any[];
 
}
const SampleModel: React.FC<PopupProps> = ({visible,onOk,onClose, buttons, Content}) => {
 

  return (
    <>
     
      <Modal title="Basic Modal" open={visible} onOk={onOk} onCancel={onClose}>
      <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
        {/* Content */}
        {/* ... */}
        <p>nvwoinvoiwnvownovnw</p>
        {Content}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        {/* Dynamic Buttons */}
        {buttons.map((button, index) => (
          <Button key={index} onClick={() => { /* Handle button click */ }}>
            {button?.title}
          </Button>
        ))}
      </div>
      </Modal>
    </>
  );
};

export default SampleModel;