import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message } from 'antd';

const Formupdate = () => {
  const [curdata, setCurdata] = useState({});
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const Id = localStorage.getItem('client');
    setUserId(Id);

    fetch('http://localhost/doan2/phpbackend/getin4_user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: Id }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setCurdata(result.data);
          setEmail(result.data.email);
          setFullName(result.data.name);
          setPhoneNumber(result.data.phone);
          setGender(result.data.gender);
          setBirthdate(result.data.birthday);
        } else {
          console.error(result.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userId,
      email,
      fullName,
      phoneNumber,
      gender,
      birthdate,
    };

    fetch('http://localhost/doan2/phpbackend/update_user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          message.success(result.message);

          // Sử dụng setTimeout để thực hiện hành động sau khi thông báo được hiển thị trong một khoảng thời gian nhất định
          setTimeout(() => {
            setCurdata({
              ...curdata,
              email,
              fullName,
              phoneNumber,
              gender,
              birthdate,
            });
            window.location.reload();
          }, 2000);

        } else {
          toast.error(result.message, {
            position: 'top-left',
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <h1 style={{ fontWeight: 'bold' }} className='title_head'>Thông tin tài khoản</h1>
      <form onSubmit={handleSubmit} method='post'>
        <div style={{ marginTop: '15px', gap: '10px' }} className="input-form">
          <label htmlFor="email">Email*</label>
          <input type="text" name="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="fullName">Họ tên*</label>
          <input type="text" name="fullName" value={fullName || ''} onChange={(e) => setFullName(e.target.value)} placeholder='Nhập tên của bạn (*)' />
          <label htmlFor="phoneNumber">Số điện thoại</label>

          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber || ''}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Chỉ cho phép nhập số
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10); // Giới hạn độ dài là 10 ký tự
              }
              if (!e.target.value.startsWith('0')) {
                e.target.value = '0' + e.target.value; // Bắt buộc bắt đầu bằng 0
              }
            }}
            placeholder='Nhập số điện thoại của bạn (*)'
          />

          <label htmlFor="gender">Giới tính:</label>
          <select style={{ padding: '5px', borderColor: '#ccc' }} name="gender" value={gender || ''} onChange={(e) => setGender(e.target.value)}>
            <option value="">Chọn giới tính</option>
            <option value="nam">Nam</option>
            <option value="nữ">Nữ</option>
          </select>
          <label htmlFor="birthdate">Ngày sinh:</label>
          <input type="date" name="birthdate" value={birthdate || ''} onChange={(e) => setBirthdate(e.target.value)} />

          <div className="btn-regis">
            <button type='submit'>Cập Nhật</button>
          </div>
        </div>
      </form>
      <ToastContainer /> {/* Container để hiển thị toast */}
    </>
  );
}

export default Formupdate;