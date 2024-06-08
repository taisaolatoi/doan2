import { NavLink } from "react-router-dom";
import { RightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import './cart.css';

const Cart = () => {
    const [quantities, setQuantities] = useState([]);
    const [data, setData] = useState([]);
    const [del, setDel] = useState('');
    const [cartId, setCartId] = useState('');
    let total = 0;
    const [isClickCountUpdated, setIsClickCountUpdated] = useState(false);


    const handleDelClick = () => {
        setIsClickCountUpdated(true);
    };

    useEffect(() => {
        const Id = localStorage.getItem('client');

        fetch(`http://localhost/doan2/phpbackend/getcart.php?del=${del}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: Id, cartId: cartId }),
        })
            .then(response => response.json())
            .then(data => {
                setData(data.data);
                setQuantities(data.data.map(product => product.soluong));  // Khởi tạo số lượng từ dữ liệu nhận được
            })
            .catch(error => {
                console.error(error);
            });
        setIsClickCountUpdated(false);
    }, [isClickCountUpdated, del]);


    return (
        <div style={{ marginBottom: '200px' }} className="container_cart">
            <div className="bread-crumb">
                <div className="container-bread-crumb">
                    <ul className="breadcrumb">
                        <li>
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                <p>Trang chủ</p>
                            </NavLink>
                        </li>
                        <RightOutlined />
                        <li>
                            <p style={{ color: '#e95211' }}>Giỏ hàng</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container">
                {data && Array.isArray(data) && data.length > 0 ? (
                    <div className="container_cart">
                        <div className="header_cart">
                            <h1 className="title_cart">GIỎ HÀNG CỦA BẠN</h1>
                        </div>
                        <Row>
                            <Col style={{ width: '100%' }}>
                                <form action="">
                                    <div className="title_cart_header">
                                        Giỏ hàng
                                    </div>
                                    {data && data.map((product, index) => {
                                        const formattedPrice = parseFloat(product.giasanpham);
                                        const productIndex = index;

                                        const handleIncreaseQuantity = (productIndex) => {
                                            const updatedQuantities = [...quantities];
                                            const currentQuantity = parseInt(updatedQuantities[productIndex]);
                                            const maxQuantity = data[productIndex]?.soluongdb;

                                            if (currentQuantity < maxQuantity) {
                                                updatedQuantities[productIndex] = (currentQuantity + 1).toString();
                                                setQuantities(updatedQuantities);
                                                updateCartQuantity(productIndex, currentQuantity + 1); // Gửi yêu cầu cập nhật số lượng mới trong bảng cart
                                            } else {
                                                const message = `Số lượng trong giỏ hàng chỉ còn ${currentQuantity}`;
                                                toast.warning(message, {
                                                    position: 'top-center',
                                                    autoClose: 3000,
                                                });
                                            }
                                        };

                                        const handleDecreaseQuantity = (productIndex) => {
                                            if (quantities[productIndex] > 1) {
                                                const updatedQuantities = [...quantities];
                                                updatedQuantities[productIndex] -= 1;
                                                setQuantities(updatedQuantities);
                                                updateCartQuantity(productIndex, quantities[productIndex] - 1); // Gửi yêu cầu cập nhật số lượng mới trong bảng cart
                                            }
                                        };

                                        const updateCartQuantity = (productIndex, newQuantity) => {
                                            const updatedCart = [...data];
                                            updatedCart[productIndex].soluong = newQuantity;
                                            setData(updatedCart);
                                        };


                                        // Tính tổng tiền
                                        total += formattedPrice * quantities[productIndex];
                                        <ToastContainer />
                                        return (
                                            <div className="cart_body" key={index}>
                                                <div className="cart_product">
                                                    <div className="cart_product_img">
                                                        <img style={{ width: '80px', height: '80px' }} src={product.hinhanh} alt="" />
                                                    </div>
                                                    <div className="cart_info">
                                                        <div style={{ width: '300px' }} className="product_name">
                                                            <p>{product.tensanpham}</p>
                                                            <p style={{ color: '#9e9e9e', fontSize: '12px' }}>Size: {product.size}</p>
                                                        </div>
                                                        <div className="grid_item">
                                                            <div className="select_quantity">
                                                                <button type="button" className="decrease-btn" onClick={() => handleDecreaseQuantity(productIndex)}>-</button>
                                                                <input
                                                                    style={{ width: '40px', textAlign: 'center' }}
                                                                    className="quantity-input"
                                                                    type="number"
                                                                    value={quantities[productIndex]}
                                                                    min="1"
                                                                    readOnly
                                                                    onChange={(e) => {
                                                                        const updatedQuantities = [...quantities];
                                                                        updatedQuantities[productIndex] = parseInt(e.target.value) || 1;
                                                                        setQuantities(updatedQuantities);
                                                                    }}
                                                                />
                                                                <button type="button" className="increase-btn" onClick={() => handleIncreaseQuantity(productIndex)}>+</button>
                                                            </div>
                                                            <div className="cart_prices">
                                                                <span>{formattedPrice.toLocaleString()}₫</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="del_product" onClick={() => { handleDelClick(); setDel(product.idsanpham); setCartId(product.id); }}>
                                                        <NavLink>
                                                            <CloseCircleOutlined />
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="cart_footer">
                                        <div className="sub_total">
                                            <div className="total_title">Tổng tiền:</div>
                                            <div className="total_price">{total.toLocaleString()}đ</div>
                                        </div>
                                        <div className="btn-regis">
                                            <NavLink to="/check_out/checkout">
                                                <button type="submit">Đặt hàng</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <div className="cart_empty">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_9tU26ScOUphi8C_r4rCaC9ploZmrC4lhksUwToShw&s" alt="" />
                        <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;