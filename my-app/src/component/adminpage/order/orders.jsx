import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './order.css';


const OrderList = () => {
    const [orders, setOrders] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderStatus, setOrderStatus] = useState('');
    const [handleStatusChange, handleOrderStatusChange] = useState([]);
    const [ordersDetail, setOrdersDetail] = useState('');
    const [updateTrigger, setUpdateTrigger] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost/doan2/phpbackend/orders.php');
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    setOrders(Object.values(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        };
        console.log(orders);

        fetchOrders();
    }, [updateTrigger]); // Thêm updateTrigger làm dependency để gọi lại fetchOrders khi nó thay đổi

    const handleSubmit = (madonhang, idsize) => (e) => {
        e.preventDefault();
        const data = {
            handleStatusChange,
            selectedOrderId: madonhang,
            idsize: idsize // Adding order.idsize to the data object
        };

        axios.post('http://localhost/doan2/phpbackend/update-order-status.php', data)
            .then(response => {
                if (response.data.success) {
                    handleOrderStatusChange(response.data);
                    setUpdateTrigger(prev => !prev); // Cập nhật updateTrigger để gọi lại useEffect
                } else {
                    console.error('Error from backend');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };


    const handleDelete = (madonhang) => (e) => {
        e.preventDefault();
        axios.post(`http://localhost/doan2/phpbackend/delete_orders.php?madonhang=${madonhang}`)
            .then(response => {
                if (response.data.success) {
                    setOrders(orders.filter(order => order.madonhang !== madonhang));
                } else {
                    console.error(response.data.message);
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
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order.madonhang}>
                                <td>DH{order.madonhang}</td>
                                <td>{order.hoten}</td>
                                <td>{order.ngaydat}</td>
                                <td>{parseFloat(order.tonggia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td>{order.pttt}</td>
                                <td>
                                    <form method='POST' onSubmit={handleSubmit(order.madonhang)}>
                                        <input type="hidden" value={order.madonhang} name='orderid' onChange={(e) => setSelectedOrderId(e.target.value)} />
                                        <select
                                            defaultValue={order.trangthai}
                                            name="status"
                                            onChange={(e) => handleOrderStatusChange(e.target.value)}
                                            disabled={order.trangthai === 'Đã hủy' || order.trangthai === 'Đã hoàn thành'}
                                        >
                                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                                            <option value="Đã xác nhận">Đã xác nhận</option>
                                            <option value="Đang giao">Đang giao</option>
                                            <option value="Đã hoàn thành">Đã hoàn thành</option>
                                            <option value="Đã hủy">Đã hủy</option>
                                        </select>
                                    </form>
                                </td>
                                <td>
                                    <NavLink to={`/admin/order-details/${order.madonhang}`}>
                                        Chi tiết đơn hàng
                                    </NavLink>
                                </td>
                                <td style={{ display: 'flex', gap: '10px', height: '78px' }}>
                                    <form method='POST' onSubmit={order.trangthai !== 'Đã hủy' ? handleSubmit(order.madonhang, order.idsize) : null}>
                                        <button type='submit' disabled={order.trangthai === 'Đã hủy' || order.trangthai === 'Đã hoàn thành'}>
                                            Cập nhật
                                        </button>
                                    </form>
{/* 
                                    <form method='POST' onSubmit={handleDelete(order.madonhang)}>
                                        <button type='submit'>Xóa</button>
                                    </form> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">Không có đơn hàng</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;