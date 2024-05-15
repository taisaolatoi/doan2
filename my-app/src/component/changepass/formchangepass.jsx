import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
        toast.success(
          <>
            Đổi mật khẩu thành công!
            <br />
            Đang chuyển hướng về trang Login...
          </>
          , {
            position: 'top-left',
            autoClose: 3000, // thời gian hiển thị toast là 5000ms (5 giây)
            onClose: () => {
              localStorage.removeItem('client');
              navigate('/login');
            }
          });
      } else {
        toast.error(result.message, {
          position: 'top-left'
        });
      }

    } catch (error) {
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.', {
        position: 'top-left'
      });
      console.error(error);
    }
  };

  return (
    <>
      <h1 style={{ fontWeight: 'bold' }} className='title_head'>Thông tin tài khoản</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} method='post'>
        <div style={{ marginTop: '15px', gap: '10px' }} className="input-form">
          <label style={{ fontWeight: 'bold' }} htmlFor="">Mật khẩu hiện tại: </label>
          <input type="password" placeholder='Mật khẩu hiện tại (*)' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <label style={{ fontWeight: 'bold' }} htmlFor="">Mật khẩu mới:</label>
          <input type="password" placeholder='Mật khẩu mới (*)' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <label style={{ fontWeight: 'bold' }} htmlFor="">Nhập lại mật khẩu mới:</label>
          <input type="password" placeholder='Nhập lại mật khẩu mới (*)' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          <div className="btn-regis">
            <button type='submit'>Đổi mật khẩu</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Formchangepass;
