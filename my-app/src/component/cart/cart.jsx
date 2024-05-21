import { NavLink } from "react-router-dom";
import { RightOutlined, CloseCircleOutlined, ConsoleSqlOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd';
import { useEffect, useState } from "react";
import './cart.css';

const Cart = () => {
    // const [userId, setUserId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState();
    const [del, setDel] = useState('');
    // const [clickCount, setClickCount] = useState(1);
    const [isClickCountUpdated, setIsClickCountUpdated] = useState(false);


    // console.log(clickCount);

    const handleDelClick = () => {
        // setClickCount(clickCount +1);
        setIsClickCountUpdated(true);
    };

    useEffect(() => {
        const Id = localStorage.getItem('client');
      
        fetch(`http://localhost/doan2/phpbackend/getcart.php?del=${del}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: Id }),
        })
          .then(response => response.json())
          .then(data => {
            setData(data.data);
          })
          .catch(error => {
            console.error(error);
          });
        setIsClickCountUpdated(false);
      }, [isClickCountUpdated, del]);




    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

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

                                    {data && data.map((product, index) => (
                                        <div className="cart_body" key={index}>
                                            <div className="cart_product">
                                                <div className="cart_product_img">
                                                    <img style={{ width: '80px', height: '80px' }} src={product.hinhanh} alt="" />

                                                </div>
                                                <div className="cart_info">
                                                    <div style={{ width: '300px' }} className="product_name">
                                                        <p>{product.tensanpham}</p>
                                                        <p>Size: 42</p>
                                                    </div>
                                                    <div className="grid_item">
                                                        <div className="select_quantity">
                                                            <button type="button" className="decrease-btn" onClick={handleDecreaseQuantity}>-</button>
                                                            <input
                                                                style={{ width: '40px', textAlign: 'center' }}
                                                                className="quantity-input"
                                                                type="text"
                                                                value={product.soluong}
                                                                maxLength="2"
                                                                min="1"
                                                                onChange={(e) => setQuantity(e.target.value)}
                                                            />
                                                            <button type="button" className="increase-btn" onClick={handleIncreaseQuantity}>+</button>
                                                        </div>
                                                        <div className="cart_prices">
                                                            <span>{product.giasanpham}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="del_product" onClick={() => { handleDelClick(); setDel(product.idsanpham); }}>
                                                    <NavLink>
                                                        <CloseCircleOutlined />
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                    <div className="cart_footer">
                                        <div className="sub_total">
                                            <div className="total_title">Tổng tiền:</div>
                                            <div className="total_price">260000đ</div>
                                        </div>
                                        <div className="btn-regis">
                                            <button type="submit">Đặt hàng</button>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <div className="cart_empty">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_9tU26ScOUphi8C_r4rCaC9ploZmrC4lhksUwToShw&s" alt="" />
                        <p>Không có sản phẩm nào trong giỏ hàng của bạn </p>
                    </div>
                )}
            </div>

        </div>

    )
}
export default Cart;