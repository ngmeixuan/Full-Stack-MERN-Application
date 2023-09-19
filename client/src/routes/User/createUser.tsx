import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Slider,
  Space,
  Spin,
  Switch,
  TreeSelect,
  Upload,
} from "antd";

const { Option } = Select;

const CreateUser: React.FC = () => {
  const [form] = Form.useForm();
  const baseUrl = `http://localhost:5000/user`;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const validateMessages = {
    required: "${label} is required",
    types: {
      number: "${label} is not a valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values: any) => {
    // Perform API call to create a new user using axios
    axios
      .post(baseUrl, values)
      .then((response) => {
        // Handle successful response
        message.success("User created successfully!");
        console.log("User created successfully: ", response.data);

        // Reset the form
        form.resetFields();
      })
      .catch((error) => {
        message.error("Error creating the user");
        console.error("Error creating the user:", error);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div>
        <h2>Create user</h2>
      </div>
      <>
        <Form
          {...formItemLayout}
          form={form}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true }]}
          >
            <DatePicker placeholder="Select date" />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select allowClear>
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
              <Option value="UNDISCLOSED">Undisclosed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email", warningOnly: true, message: "Invalid email format" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </>
    </>
  );
};

export default CreateUser;
