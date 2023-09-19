import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";

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

const UpdateUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const baseUrl = `http://localhost:5000/user/${id}`;

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

  useEffect(() => {
    // Fetch user data based on the user ID
    axios
      .get(baseUrl)
      .then((response) => {
        const userData = response.data;
        form.setFieldsValue({
          id: id,
          name: userData.name,
          email: userData.email,
          dob: moment(userData.dob),
          gender: userData.gender,
        });
      })
      .catch((error) => {
        console.log("Error fetching user data: ", error);
      });
  }, [id, form]);

  const onFinish = (values: any) => {
    // Perform API call to update the user
    const updatedUser = {
      name: values.name,
      email: values.email,
      dob: values.dob.format("YYYY-MM-DD"),
      gender: values.gender,
    };
    axios
      .patch(baseUrl, updatedUser)
      .then((response) => {
        // Handle successful response
        message.success("User updated successfully!");
        console.log("User updated successfully: ", response.data);
        // Redirect to user list
        navigate("/user/list");
      })
      .catch((error) => {
        // Handle error
        message.error("Error updating the user");
        console.error("Error updating the user:", error);
      });
  };

  const onReset = () => {
    form.resetFields(["name", "dob", "gender", "email"]);
  };

  return (
    <div>
      <h2>Edit User</h2>
      <Spin spinning={form.getFieldValue("id") === ""}>
        <Form
          {...formItemLayout}
          form={form}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item name="id" label="User ID" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true }]}
          >
            <DatePicker placeholder="Select date" showToday={false}/>
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
            rules={[{ required: true }, { type: "email", warningOnly: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default UpdateUser;
