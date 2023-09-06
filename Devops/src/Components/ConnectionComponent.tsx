import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, notification, Modal} from 'antd';
import { fetchWorkItemTypesFromDevops } from '../Api/devopsApis';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ConnectionProps {
  setWorkItemData:any,
  connectionFetch:any,
  url:any
  setLoader:any
  saveConnectingDetails:any,
  connectionSaveData:any
}

 const ConnectionComponent :React.FC <ConnectionProps> = ({setWorkItemData, connectionFetch,url,setLoader,saveConnectingDetails,connectionSaveData})=> {
  const [form] = Form.useForm();
  const [error, setError] = useState<boolean>(false);
  const [modal, contextHolder] = Modal.useModal()
console.log("AZU",url);

console.log("connectionSaveData",connectionSaveData);


  const obj = {
    "organizationUri": connectionSaveData?.connectionDetails?.gyde_devopsorganizationurl,
    "projectName": connectionSaveData?.connectionDetails?.gyde_devopsprojectname,
}

const handleConnection = (values:any,url:any) => {

  fetchWorkItemTypesFromDevops(url,values).then((res:any)=>{
    if(res?.status=="success"){
       notification.success({
        message:"Success",
        description:"Successfully connected..!"
      }); 
      localStorage.setItem('items',JSON.stringify(values));
      console.log("res........!!!", res);
      saveConnectingDetails(values);
      setWorkItemData(res);
      setLoader(false)
    }else{
      if(res?.data?.StatusCode==500){
        notification.success({
          message:"Error",
          description:"Connection Failed. Try again.."
        });
        setLoader(false)
      }else{
       notification.error({
        message:"Error",
        description:res?.data?.Value
      }) 
      setLoader(false)
      } 
    }
   })
}

const confirm = (values:any,url:any) => {
  modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleOutlined/>,
    content: 'Connection details are being changed compared to the current connection details. This will reset all the current mappings you have done. Do you wish to proceed?',
    okText: 'Yes',
    onOk: () => { // Wrap in an arrow function to access values and url
      console.log("values", values);
      handleConnection(values, url);
    },
    onCancel() {
      console.log('User clicked No');
    },
    cancelText: 'No',
  });
};
  const onFinish = (values: any) => {
    setLoader(true)
    connectionFetch(false);
    console.log("onFinish", values,url); // You can handle the form submission here

    if(obj?.organizationUri !== undefined && obj?.projectName !== undefined){
 console.log("*88888*",obj?.projectName , values?.projectName ,"7", obj?.organizationUri , values?.organizationUri);
 

      obj?.projectName !== values?.projectName || obj?.organizationUri !== values?.organizationUri ?  confirm(values,url): handleConnection(values,url)

     
    }else {
      handleConnection(values,url)
    }

  
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then(() => {
        onFinish(form.getFieldsValue());
      })
      .catch((error) => {
        // message.error('Please fill in all fields.');
      });
  };
  console.log("objectASYNX",obj);
  

  return (
    <>
    <Form form={form} initialValues={obj} className='connection-form'>
      <Row gutter={20}>
        <Col span={12}>
          <span className='label'>Organization URL</span>
          <Form.Item className="custom-form-wrap" name="organizationUri" label="" rules={[{ required: true, message: 'Please enter Organization URL' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
        <span className='label'>DevOps Project</span>
          <Form.Item className="custom-form-wrap" name="projectName" rules={[{ required: true, message: 'Please enter DevOps Project' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
        <span className='label'>Authorization Token</span>
          <Form.Item className="custom-form-wrap" name="personalAccessToken" rules={[{ required: true, message: 'Please enter Authorization Token' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
        <div className="button-form">
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleFormSubmit}>
              Connect
            </Button>
          </Form.Item>
        </div>
    </Form>
    {contextHolder}
    </>
  );
}

export default ConnectionComponent;
