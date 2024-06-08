import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import './orderDetail.css';

const OrderDetail = () => {
    const [orders, setOrders] = useState([]);
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        axios.get(`http://localhost/doan2/phpbackend/ordersdetail.php?id=${id}`)
            .then(res => {
                setOrders(res.data)

            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);


    return (
        <div className="container">
            <div className="sub-container">
                <h1>Chi tiết đơn hàng</h1>
                <h3>
                    <NavLink to="/admin/orders">
                        Quay lại danh sách
                    </NavLink>
                </h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Mã Đơn Hàng</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Hình Ảnh</th>
                        <th>Số Lượng</th>
                        <th>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>DH{order.madonhang}</td>
                            <td>{order.tensanpham}</td>
                            <td>
                                <img style={{ width: '50px' }} src={order.url_hinhanh} />
                            </td>
                            <td>{order.soluong}</td>
                            <td>{parseFloat(order.giasanpham).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetail;