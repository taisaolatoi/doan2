import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './order.css';


const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderStatus, setOrderStatus] = useState('');
    const [handleStatusChange, handleOrderStatusChange] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost/doan2/phpbackend/orders.php');
                // Kiểm tra xem response.data có phải là một mảng hay không
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    // Nếu không phải mảng, chuyển đổi nó thành mảng
                    setOrders(Object.values(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);
    console.log(selectedOrderId);
    const handleSubmit = (madonhang) => (e) => {
        e.preventDefault();
        const data = {
            handleStatusChange,
            selectedOrderId: madonhang
        };

        axios.post('http://localhost/doan2/phpbackend/update-order-status.php', data)
            .then(response => {
                if (response.data.success) {
                    handleOrderStatusChange(response.data);
                } else {
                    // Xử lý khi có lỗi từ backend
                }
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div className='container_add'>
            <h1>Danh sách đơn hàng</h1>
            <table>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Khách hàng</th>
                        <th>Ngày đặt</th>
                        <th>Tổng giá</th>
                        <th>Phương thức thanh toán</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                        <th>Thiết lập</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.madonhang}>
                            <td>{order.madonhang}</td>
                            <td>{order.hoten}</td>
                            <td>{order.ngaydat}</td>
                            <td>{order.tonggia} VNĐ</td>
                            <td>{order.pttt}</td>
                            <td>
                                <form method='POST' onSubmit={handleSubmit(order.madonhang)}>
                                    <input type="hidden" value={order.madonhang} name='orderid' onChange={(e) => setSelectedOrderId(e.target.value)} />
                                    <select
                                        defaultValue={order.trangthai}
                                        name="status"
                                        onChange={(e) => handleOrderStatusChange(e.target.value)}
                                    >
                                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                                        <option value="Đã xác nhận">Đã xác nhận</option>
                                        <option value="Đang giao">Đang giao</option>
                                        <option value="Đã hoàn thành">Đã hoàn thành</option>
                                        <option value="Đã huỷ">Đã huỷ</option>
                                    </select>
                                </form>
                            </td>
                            <td>
                                <NavLink to={`/admin/order-details/${order.madonhang}`}>
                                    Chi tiết đơn hàng
                                </NavLink>
                            </td>
                            <td>
                                <form method='POST' onSubmit={handleSubmit(order.madonhang)}>
                                    <button type='submit'>Cập nhật</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;