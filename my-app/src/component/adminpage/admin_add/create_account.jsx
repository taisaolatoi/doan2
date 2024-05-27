import React, { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AccountCreationForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try { 
      const checkResponse = await axios.get(`http://localhost/doan2/phpbackend/adminphp/check_username.php?username=${values.username}`);
      if (checkResponse.data.exists) {
        message.error('Username already exists.');
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('password', values.password);
      formData.append('role', values.role);
      formData.append('name', values.name);

      const response = await axios.post('http://localhost/doan2/phpbackend/adminphp/create_account.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success(response.data.message);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra khi tạo tài khoản.');
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please enter the username' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please enter the password' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: 'Please select the role' }]}
      >
        <Select placeholder="Select a role">
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter the name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
}
export default AccountCreationForm;