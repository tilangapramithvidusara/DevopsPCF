import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, notification, } from 'antd';
import { fetchWorkItemTypesFromDevops } from '../Api/devopsApis';

interface ConnectionProps {
  setWorkItemData:any,
  connectionFetch:any,
  url:any
}

 const ConnectionComponent :React.FC <ConnectionProps> = ({setWorkItemData, connectionFetch,url})=> {
  const [form] = Form.useForm();
  const [error, setError] = useState<boolean>(false);
console.log("AZU",url);

  const obj = {
    "organizationUri": "https://dev.azure.com/SEERTEST2",
    "personalAccessToken": "ix4lb6vbaj4ydxcmb5bezbcctm6upqmccbq7b7bnr7thqaemzprq",
    "projectName": "SEETTEST1"
}
  const onFinish = (values: any) => {
    connectionFetch(false);
    console.log("onFinish", values,url); // You can handle the form submission here
   fetchWorkItemTypesFromDevops(url,values).then((res:any)=>{
    if(res?.status=="success"){
       notification.success({
        message:"Success",
        description:"Successfully connected..!"
      }); 
      localStorage.setItem('items',JSON.stringify(values));
      console.log("res........!!!", res);
      setWorkItemData(res);
    }else{
      if(res?.data?.status==500){
        notification.success({
          message:"Error",
          description:"Connection Failed. Try again.."
        });
      }else{
       notification.error({
        message:"Error",
        description:res?.data
      }) 
      } 
    }
   })
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

  return (
    <Form form={form}  className='connection-form'>
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
          <Form.Item className="custom-form-wrap mt-20" name="personalAccessToken" rules={[{ required: true, message: 'Please enter Authorization Token' }]}>
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
  );
}

export default ConnectionComponent;
