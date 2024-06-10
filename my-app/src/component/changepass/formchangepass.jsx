import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { message } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

const Formchangepass = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Lấy ID người dùng khi component được mount
    const Id = localStorage.getItem('client');
    setUserId(Id); // Lưu ID vào state
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId,
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    try {
      const response = await fetch('http://localhost/doan2/phpbackend/changePass.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        message.success('Đổi mật khẩu thành công đang chuyển hướng về trang Login..', () => {

          localStorage.removeItem('client');
          navigate('/login');
        });
      } else {
        message.error(result.message, {
          position: 'top-left'
        });
      }

    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <h1 style={{ fontWeight: 'bold' }} className='title_head'>Thông tin tài khoản</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} method='post'>
        <div style={{ marginTop: '15px', gap: '10px' }} className="input-form">
          <label style={{ fontWeight: 'bold' }} htmlFor="">Mật khẩu hiện tại: </label>
          <input type="password" placeholder='Mật khẩu hiện tại (*)' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          <label style={{ fontWeight: 'bold' }} htmlFor="">Mật khẩu mới:</label>
          <input type="password" placeholder='Mật khẩu mới (*)' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <label style={{ fontWeight: 'bold' }} htmlFor="">Nhập lại mật khẩu mới:</label>
          <input type="password" placeholder='Nhập lại mật khẩu mới (*)' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
          <div className="btn-regis">
            <button type='submit'>Đổi mật khẩu</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Formchangepass;
