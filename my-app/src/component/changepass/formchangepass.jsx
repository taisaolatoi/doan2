import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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


  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi yêu cầu đổi mật khẩu đến backend để xử lý
    const data = {
      userId,
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    fetch('http://localhost/doan2/phpbackend/changePass.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          localStorage.removeItem('client');
          navigate('/login');
        } else {
          console.error(result.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

    return (
        <>
            <h1 style={{ fontWeight: 'bold' }} className='title_head'>Thông tin tài khoản</h1>
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
}

export default Formchangepass;