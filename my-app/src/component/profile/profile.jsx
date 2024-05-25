import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { UserOutlined, PhoneOutlined, PaperClipOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

import './profile.css';

const Profile = () => {

    // const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({});
    const handleOrderClick = (order) => {
        setSelectedOrder(order);

    };

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


    useEffect(() => {
        const fetchOrders = async () => {
            const client = localStorage.getItem('client');

            try {
                const response = await fetch('http://localhost/doan2/phpbackend/getorder.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: client }), // Thay yourUserId bằng ID người dùng của bạn
                });

                const result = await response.json();

                if (response.ok) {
                    setOrders(result); // Cập nhật trạng thái orders với dữ liệu từ API
                    console.log(orders);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrders(); // Gọi hàm fetchOrders để lấy dữ liệu khi component được render

        // Lưu ý: Bạn cần thay đổi dependencies của useEffect nếu cần
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
                                            {orders.map((order, index) => (
                                                <tr key={index}>
                                                    <td style={{cursor: 'pointer'}} 
                                                    onClick={() => handleOrderClick(order)} >
                                                        <p className='order_number'>DH{order.madonhang}</p>
                                                    </td>
                                                    <td>{order.ngaydat}</td>
                                                    <td>{order.address}</td>
                                                    <td>{order.tonggia}</td>
                                                    <td>{order.trangthai}</td>
                                                </tr>
                                            ))}
                                            {/* Hiển thị thông báo khi không có đơn hàng */}
                                            {orders.length === 0 && (
                                                <tr>
                                                    <td colSpan={5}>
                                                        <p>Không có đơn hàng nào</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Modal
                    title={`Chi tiết đơn hàng: DH${selectedOrder?.madonhang}`}
                    visible={!!selectedOrder}
                    onCancel={() => setSelectedOrder(null)}
                    footer={null}
                >
                    <table>
                        <thead>
                            <tr>
                                <th style={{width: '300px'}}>Tên sản phẩm</th>
                                <th style={{width: '100px'}}>Hình ảnh</th>
                                <th style={{width: '100px'}}>Giá</th>
                                <th style={{width: '100px'}}>Số lượng</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {selectedOrder?.productInfo.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.tensanpham}</td>
                                    <td><img style={{ width: '50px' }} src={product.hinhanh} alt="" /></td>
                                    <td>{product.giasanpham}</td>
                                    <td>{product.soluong}</td>
                                    <td>{product.namesize}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal>
            </div>
        </>
    );
};

export default Profile; 