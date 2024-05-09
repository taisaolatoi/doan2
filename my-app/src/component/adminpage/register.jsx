import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SectionNewProduct from '../SectionNewProduct/SectionNewProduct';
import { Button, Modal } from 'antd';
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

    fetch('http://localhost/reactt/phpbackend/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setSuccessModalVisible(true); // Hiển thị Modal
  
          // Sau 4 giây, reset các trường dữ liệu đăng ký
          setTimeout(() => {
            // reset các giá trị trong form
            setName('');
            setEmail('');
            setPhone('');
            setUsername('');
            setPassword('');
            setRepassword('');
            setSuccessModalVisible(false); // Ẩn Modal
          }, 4000);
        } else {
          console.error(result.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="login-regist-form">
      <SectionNewProduct textbaner='ĐĂNG KÝ' />
      <form onSubmit={handleSubmit}>
        <p style={{ textAlign: 'center' }}>Đã có tài khoản, đăng nhập <NavLink style={{ color: '#e95221', textDecoration: 'none' }} exact to="/login">tại đây</NavLink> </p>
        <div style={{ marginTop: '15px', gap: '10px' }} className="input-form">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nhập tên của bạn (*)' required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Nhập email của bạn (*)' required/>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Số điện thoại' required/>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Tên tài khoản' autoComplete="username" required/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mật khẩu' autoComplete="new-password" required />
          <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} placeholder='Nhập lại mật khẩu' autoComplete="new-password" required />

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