import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { UserOutlined, PhoneOutlined, PaperClipOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {

    // const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const [customerInfo, setCustomerInfo] = useState({});

    useEffect(() => {
        const client = localStorage.getItem('client');
        // setUserId(client); // Gán giá trị client cho userId
    
        if (!client) {
            navigate('/login');
        } else {
            fetch('http://localhost/doan2/phpbackend/getin4_user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: client }), // Gửi giá trị client cho backend
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setCustomerInfo(result.data);
                    } else {
                        console.error(result.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [navigate]);

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
                            <b style={{ color: "#E95221" }}>{customerInfo.name}</b>
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
                                {customerInfo.name}
                            </p>
                            <p>
                                <PhoneOutlined />
                                <b>Số ĐT: </b>
                                {customerInfo.phone}
                            </p>
                            <p>
                                <PaperClipOutlined />
                                <b>Địa chỉ: </b>
                                {customerInfo.address}
                            </p>
                        <div className="edit_profile">
                            <NavLink to="/edit_profile">
                                <p>Sửa thông tin</p>
                            </NavLink>
                        </div>

                        </div>
                    </Col>
                    <Col span={17}>
                        <h1 className='title_table'>Đơn hàng của bạn</h1>
                        <div className="my_order">
                            <div className="dashboard">
                                <div className="recent_orders">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Đơn hàng</th>
                                                <th>Ngày</th>
                                                <th>Địa chỉ</th>
                                                <th>Giá trị</th>
                                                <th>Tình trạng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan={5}>
                                                    <p>Không có đơn hàng nào</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        </>
    );
};

export default Profile; 