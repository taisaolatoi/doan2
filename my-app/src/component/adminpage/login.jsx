import React, { useState } from 'react';
import SectionNewProduct from '../SectionNewProduct/SectionNewProduct';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Modal, message  } from 'antd';

const setSuccessModalVisible = (visible) => {
    setSuccessModalVisible(visible);
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);


    const navigate = useNavigate();
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
        fetch('http://localhost/reactt/phpbackend/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.success) {
                    localStorage.setItem('client', responseData.name);
                    setSuccessModalVisible(true); // Hiển thị Modal
                } else {
                    alert(responseData.message);
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

    const handleModalOk = () => {
        setSuccessModalVisible(false);
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="login-regist-form">
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
            <Modal
                visible={successModalVisible}
                title="Thông báo"
                onCancel={() => setSuccessModalVisible(false)}
                footer={[
                    <Button key="ok" onClick={() => handleModalOk()}>OK</Button>,
                ]}
            >
                <p>Đăng nhập thành công!</p>
            </Modal>
        </div>
    );
};

export default Login;