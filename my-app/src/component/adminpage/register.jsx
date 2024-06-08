import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SectionNewProduct from '../SectionNewProduct/SectionNewProduct';
import { Button, Modal } from 'antd';
import { message } from 'antd';

import './register.css';

const setSuccessModalVisible = (visible) => {
  setSuccessModalVisible(visible);
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu đăng ký đến backend PHP để xử lý
    const data = {
      name,
      email,
      phone,
      username,
      password,
      repassword,
    };

    fetch('http://localhost/doan2/phpbackend/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          message.success(result.message); // Hiển thị thông báo thành công

          // Sau 4 giây, reset các trường dữ liệu đăng ký
          setTimeout(() => {
            // reset các giá trị trong form
            setName('');
            setEmail('');
            setPhone('');
            setUsername('');
            setPassword('');
            setRepassword('');
          }, 2000);
        } else {
          message.error(result.message); // Hiển thị thông báo lỗi
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  function handleNameChange(e) {
    const inputValue = e.target.value;
    const pattern = /^[\p{L}\p{M}\p{P}\p{Zs}]+$/u;

    if (/\d/.test(inputValue)) {
      return;
    }

    if (!pattern.test(inputValue)) {
      return;
    }

    setName(inputValue);
  }
  function handlePhoneChange(e) {
    const inputValue = e.target.value;
    const pattern = /^0\d{0,9}$/;

    if (!pattern.test(inputValue)) {
      return;
    }

    setPhone(inputValue);
  }

  return (
    <div className="login-regist-form">
      <SectionNewProduct textbaner='ĐĂNG KÝ' />
      <form onSubmit={handleSubmit}>
        <p style={{ textAlign: 'center' }}>Đã có tài khoản, đăng nhập <NavLink style={{ color: '#e95221', textDecoration: 'none' }} exact to="/login">tại đây</NavLink> </p>
        <div style={{ marginTop: '15px', gap: '10px' }} className="input-form">
          <input type="text" value={name} onChange={handleNameChange} placeholder='Nhập tên của bạn (*)' required />
          <input type="tel" value={phone} onChange={handlePhoneChange} placeholder='Số điện thoại' required />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Tên tài khoản' autoComplete="username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mật khẩu' autoComplete="new-password" />
          <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} placeholder='Nhập lại mật khẩu' autoComplete="new-password" />

          <div className="btn-regis">
            <Button htmlType='submit'>Đăng ký</Button>
          </div>
        </div>
      </form>

      <Modal
        visible={successModalVisible}
        title="Thông báo"
        onCancel={() => setSuccessModalVisible(false)}
        footer={[
          <Button key="ok" onClick={() => setSuccessModalVisible(false)}>
            OK
          </Button>,
        ]}
      >
        <p>Đăng ký thành công!</p>
      </Modal>
    </div>

  );
};

export default Register;