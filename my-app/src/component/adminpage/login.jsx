import React, { useState } from 'react';
import SectionNewProduct from '../SectionNewProduct/SectionNewProduct';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { message } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    //Xử lý khi đăng nhập rồi thì ko vào được trang login
    useEffect(() => {
        const client = localStorage.getItem('client');
        if (client) {
            navigate('/');
        }
    }, []);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        const data = {
            username: username,
            password: password
        };

        // Send a POST request to the PHP server to handle the login
        fetch('http://localhost/doan2/phpbackend/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.success) {
                    if (responseData.role === 'admin') {
                        localStorage.setItem('admin', responseData.id);
                        navigate('/admin');

                    } else {
                        localStorage.setItem('client', responseData.id);
                        navigate('/');
                        window.location.reload();
                    }
                } else {
                    toast.error(responseData.message, {
                        position: 'top-left'
                      });
                }
            })
            .catch(error => {
                message.error('Đăng nhập không thành công!!')
            });
    };

    //xử lý ấn enter để đăng nhập
    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-regist-form">
            <ToastContainer />
            <SectionNewProduct textbaner='ĐĂNG NHẬP' />
            <form action="" method='post'>
                <div style={{ marginTop: '15px', gap: '10px' }} className="input-form">
                    <input type="text" placeholder='Email/SĐT' onChange={(e) => handleUsername(e)} />
                    <input
                        type="password" placeholder='Mật khẩu' onChange={(e) => handlePasswordChange(e)}
                        onKeyPress={(event) => handlePressEnter(event)}
                    />
                    <div className="btn-regis">
                        <button onClick={() => handleLogin()} type='button'>Đăng Nhập
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;