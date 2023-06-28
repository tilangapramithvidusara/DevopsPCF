import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, notification, } from 'antd';
import { fetchWorkItemTypesFromDevops } from '../Api/devopsApis';

 const ConnectionComponent = (setWorkItemData:any)=> {
  const [form] = Form.useForm();
  const [error, setError] = useState<boolean>(false);
  // const [workItemData, setWorkItemData] = useState<any>([]);

  const obj = {
    "organizationUri": "https://dev.azure.com/SEERTEST2",
    "personalAccessToken": "tezq4ftgd4jnxysk6jxrzzrdiplwposgyoe3dh2sld5zokedq6nq",
    "projectName": "SEETTEST1"
}
  const onFinish = (values: any) => {
    console.log("onFinish", values); // You can handle the form submission here
   fetchWorkItemTypesFromDevops().then((res:any)=>{
    if(res?.status=="success"){
      notification.success({
        message:"Success",
        description:"Successfully connected..!"
      });
      setWorkItemData(res);
    }else{
      notification.error({
        message:res?.Value
      })
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
    <Form form={form} onFinish={onFinish} initialValues={obj} className='connection-form'>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="organizationUri" label="Organization URL" rules={[{ required: true, message: 'Please enter Organization URL' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="projectName" label="DevOps Project" rules={[{ required: true, message: 'Please enter Devops Project' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="personalAccessToken" label="Authorization Token" rules={[{ required: true, message: 'Please enter Authorization Token' }]}>
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
