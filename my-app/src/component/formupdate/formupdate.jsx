import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formupdate = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [userId, setUserId] = useState(''); // Thêm state cho userId

    useEffect(() => {
        // Lấy ID người dùng khi component được mount
        const Id = localStorage.getItem('client');
        setUserId(Id); // Lưu ID vào state
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu đăng ký đến backend PHP để xử lý
        const data = {
            userId, // Thêm userId vào data
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
                    // Hiển thị toast thông báo cập nhật thành công
                    toast.success('Thông tin đã được cập nhật thành công!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                    });
                    // Đặt lại giá trị của các trường sau khi gửi thành công
                    setEmail('');
                    setFullName('');
                    setPhoneNumber('');
                    setGender('');
                    setBirthdate('');
                } else {
                    console.error(result.message);
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
                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="fullName">Họ tên*</label>
                    <input type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Nhập tên của bạn (*)' />
                    <label htmlFor="phoneNumber">Số điện thoại</label>
                    <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Nhập số điện thoại của bạn (*)' />
                    <label htmlFor="gender">Giới tính:</label>
                    <select style={{ padding: '5px', borderColor: '#ccc' }} name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Chọn giới tính</option>
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                    </select>
                    <label htmlFor="birthdate">Ngày sinh:</label>
                    <input type="date" name="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />

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