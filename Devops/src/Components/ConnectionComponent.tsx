import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, notification, } from 'antd';
import { fetchWorkItemTypesFromDevops } from '../Api/devopsApis';

interface ConnectionProps {
  setWorkItemData:any
}

 const ConnectionComponent :React.FC <ConnectionProps> = ({setWorkItemData})=> {
  const [form] = Form.useForm();
  const [error, setError] = useState<boolean>(false);

  const obj = {
    "organizationUri": "https://dev.azure.com/SEERTEST2",
    "personalAccessToken": "doqpkiixedmytbyu55nmptq2fckyjpcmztt7i4ga3jkjdnwr5j7a",
    "projectName": "SEETTEST1"
}
  const onFinish = (values: any) => {
    console.log("onFinish", values); // You can handle the form submission here
   fetchWorkItemTypesFromDevops(values).then((res:any)=>{
    if(res?.status=="success"){
       notification.success({
        message:"Success",
        description:"Successfully connected..!"
      }); 
      localStorage.setItem('items',JSON.stringify(values));
      console.log("res........!!!", res);
      setWorkItemData(res);
    }else{
      if(res?.data?.StatusCode==500){
        notification.success({
          message:"Error",
          description:"Connection Failed. Try again.."
        });
      }else{
       notification.error({
        message:"Error",
        description:res?.data?.Value
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
    <Form form={form} initialValues={obj} className='connection-form'>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item className="custom-form-wrap" name="organizationUri" label="Organization URL" rules={[{ required: true, message: 'Please enter Organization URL' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className="custom-form-wrap" name="projectName" label="DevOps Project" rules={[{ required: true, message: 'Please enter Devops Project' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item className="custom-form-wrap mt-20" name="personalAccessToken" label="Authorization Token" rules={[{ required: true, message: 'Please enter Authorization Token' }]}>
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
