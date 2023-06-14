import React from 'react';
import { Modal, Button } from 'antd';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  buttons: any[];
  Content: any;
}

// button = {title: "", onClickHandler(params), visible, onClose, styles: {width, height, color, fontColor, fontSize, fontWeight}}

const PopupComponent: React.FC<PopupProps> = ({ visible, onClose, buttons, Content }) => {
  return (
    <Modal
      open={visible}
      // onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
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
  );
};

export default PopupComponent;
