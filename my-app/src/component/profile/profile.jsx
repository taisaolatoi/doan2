import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons'
import './profile.css';

const Profile = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('client');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <>
            <div className="page_cus_container">
                <div className="page_customer">
                    <div className="page_title">
                        <h1>Thông tin tài khoản</h1>
                    </div>
                    <div className="page_name">
                        <p>
                            <i>Xin chào, </i>
                            <b style={{ color: "#E95221" }}>{username}</b>
                        </p>
                    </div>
                </div>
                <Row className='bodywrap'>
                    <Col className='block_account' span={6}>
                        <div className="block_title">
                            <h2 className="widget_title">Thông tin khách hàng</h2>
                        </div>
                        <div className="block_content">
                            <p>
                                <UserOutlined />
                                <b>Họ tên: </b>
                                {username}
                            </p>
                            <p>
                                <PhoneOutlined />
                                <b>Số ĐT: </b>
                                
                            </p>
                            <p></p>

                        </div>
                    </Col>
                    <Col span={17}>
                        hello
                    </Col>
                </Row>

            </div>
        </>
    );
};

export default Profile;