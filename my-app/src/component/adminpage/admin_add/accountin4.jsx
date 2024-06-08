import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AccountIn4 = () => {
    const [account, setAccount] = useState('');

    const navigate = useNavigate();


    const handleDelete = (accountId) => async () => {
        try {
            const response = await axios.post(`http://localhost/doan2/phpbackend/delete_account.php?id=${accountId}`);
            if (response.data.success) {
                // Xóa account khỏi danh sách sau khi xóa thành công
                setAccount(account.filter(acc => acc.id !== accountId));
                message.success('Xóa account thành công');
            } else {
                message.error('Xóa account không thành công');
            }
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra khi xóa account');
        }
    }
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get('http://localhost/doan2/phpbackend/get_account.php');
                if (Array.isArray(response.data)) {
                    setAccount(response.data);
                } else {
                    setAccount(Object.values(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAccount();
    }, []);
    return (
        <div className='container_add'>
            <h1>Danh sách đơn hàng</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Tên Khách hàng</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Giới tính</th>
                        <th>Ngày Sinh</th>
                        <th>Quyền</th>
                        <th>Thiết lập</th>
                    </tr>
                </thead>
                <tbody>
                    {account.length > 0 ? (
                        account.map(account => (
                            // Render danh sách đơn hàng
                            <tr key={account.id}>
                                <td>{account.username}</td>
                                <td>{account.name}</td>
                                <td>{account.phone}</td>
                                <td>{account.email}</td>
                                <td>{account.gender}</td>
                                <td>{account.birthday}</td>
                                <td>
                                    {account.role === '1' ? 'Admin' : 'Người dùng'}
                                </td>
                                <td>
                                    <button onClick={handleDelete(account.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">Không có dữ liệu</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    )
}
export default AccountIn4;