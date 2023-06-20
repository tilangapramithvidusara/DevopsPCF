import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, } from 'antd';

export default function ConnectionComponent() {
  const [form] = Form.useForm();
  const [error, setError] = useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log("onFinish", values); // You can handle the form submission here
    // {
    //     "organizationUri": "https://dev.azure.com/SEERTEST2",
    //     "personalAccessToken": "yspdehntr5yx6jbbwkwnrzkiekea44k4trp2dq63lfjvdixilisa",
    //     "projectName": "SEETTEST1"
    // }
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
    <Form form={form} onFinish={onFinish} className='connection-form'>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="connectionName" label="Organization URL" rules={[{ required: true, message: 'Please enter Organization URL' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="devopsOrganisation" label="DevOps Project" rules={[{ required: true, message: 'Please enter Devops Project' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        {/* <Col span={12}>
          <Form.Item name="devopsProject" label="Devops Project" rules={[{ required: true, message: 'Please enter Devops Project' }]}>
            <Input />
          </Form.Item>
        </Col> */}
        <Col span={12}>
          <Form.Item name="authToken" label="Authorization Token" rules={[{ required: true, message: 'Please enter Authorization Token' }]}>
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
