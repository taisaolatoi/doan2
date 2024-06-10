import { NavLink } from "react-router-dom";
import { RightOutlined, CheckCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { Col, Row } from 'antd'
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { message } from "antd";
import Comment
    from "../comment/comment";
const ProductInfo = ({ product }) => {
    const [name] = useState(product[0].tensanpham);
    const [price] = useState(product[0].giasanpham);
    const [img] = useState(product[0].url_hinhanh);
    const [id] = useState(product[0].idsanpham);
    const [quantity, setQuantity] = useState(1);
    const [sizeId, setSizeId] = useState({});
    const [userId, setUserId] = useState('');
    const [showModal, setShowModal] = useState(false);
    // Các state và hàm xử lý sự kiện khác

    const [selectedSize, setSelectedSize] = useState('');
    const [outOfStockMessage, setOutOfStockMessage] = useState();
    // const [quantityBySize, setQuantityBySize] = useState({});

    const handleSizeChange = (e) => {
        const selectedSize = e.target.value;
        const selectedSizeData = product.find((size) => size.namesize === selectedSize);
        const newSizeId = { ...sizeId };
        newSizeId[selectedSize] = selectedSizeData.idsize;
        setSizeId(newSizeId);
        setSelectedSize(selectedSize);
    };

    //   useEffect(() => {
    //     const selectedSizeData = product.find((size) => size.namesize === selectedSize);

    //     if (selectedSizeData && selectedSizeData.soluong < quantity) {
    //       setOutOfStockMessage('Hết hàng');
    //     } else {
    //       setOutOfStockMessage('');
    //     }
    //   }, [selectedSize]);

    const handleAddToCart = () => {
        if (userId) {
            if (selectedSize) {
                setShowModal(true); // Hiển thị modal khi thêm vào giỏ hàng thành công
            } else {
                const hide = message.error('Chọn Size!!');
                setTimeout(() => {
                    hide();
                }, 2000);
            }

        } else {
            const hide = message.error('Cần đăng nhập để mua hàng!!');
            setTimeout(() => {
                hide();
            }, 2000);
            setShowModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Ẩn modal khi nhấn vào nút đóng hoặc bất kỳ vị trí nào ngoài modal
    };

    useEffect(() => {
        const Id = localStorage.getItem('client');
        setUserId(Id);
    }, []);

    useEffect(() => {
        product.forEach((size, index) => {
            if (outOfStockMessage && size.namesize === selectedSize && size.soluong < quantity + 1) {
                const hide1 = message.error(outOfStockMessage);
                setTimeout(() => {
                    hide1();
                }, 2000); // 2000 milliseconds = 2 giây
            }
        });
    }, [outOfStockMessage, selectedSize, quantity, product]);
    // console.log(userId)
    const formattedPrice = parseFloat(product[0].giasanpham);
    const formattedOldPrice = parseFloat(product[0].giacu);
    const isAvailable = (product) => {
        return Array.isArray(product) && product.some(item => item.soluong > 0);
    };
    const isProductWithSize = ["Áo Cầu Lông", "Quần Cầu Lông", "Váy Cầu Lông", "Giày Cầu Lông", "Vợt Cầu Lông"].includes(product[0].tenloai);



    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        const selectedSizeData = product.find((size) => size.namesize === selectedSize);

        if (selectedSizeData && selectedSizeData.soluong < quantity + 1) {
            setOutOfStockMessage(`Hết Hàng trong giỏ hàng chỉ còn ${selectedSizeData.soluong}`);
        } else {
            setOutOfStockMessage('');
            setQuantity(quantity + 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra nếu người dùng đã chọn size
        if (selectedSize) {
            // Gửi registration data to PHP backend for processing
            const data = {
                userId,
                name,
                price,
                img,
                id,
                quantity,
                selectedSize,
                sizeId: sizeId[selectedSize]
            };
            console.log(data);

            fetch('http://localhost/doan2/phpbackend/cart.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result); // Log the server response
                    if (result.success) {
                        console.success(result.message);
                    } else {
                        console.error(result.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // Người dùng không chọn size, gửi sizeId rỗng đến backend
            const data = {
                userId,
                name,
                price,
                img,
                id,
                quantity,
                selectedSize: 'N/A',
                sizeId: 0,
            };
            console.log(data);

            fetch('http://localhost/doan2/phpbackend/cart.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result); // Log the server response
                    if (result.success) {
                        console.success(result.message);
                    } else {
                        console.error(result.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    function handleKeyDown(e) {
        e.preventDefault();
    }

    function handlePaste(e) {
        e.preventDefault();
    }

    // document.addEventListener('DOMContentLoaded', function () {
    //     const inputs = document.querySelectorAll('input[type="radio"]'); // Chọn tất cả các input có type là radio

    //     inputs.forEach(input => {
    //         input.removeAttribute('disabled'); // Xóa thuộc tính disabled khỏi mỗi input
    //         input.removeAttribute('class'); // Xóa thuộc tính class khỏi mỗi input
    //     });
    // });

    return (
        <>
            <div className="bread-crumb">
                <div className="container-bread-crumb">
                    <ul className="breadcrumb">
                        <li><NavLink to="/" style={{ textDecoration: 'none' }}>
                            <p>Trang chủ</p>
                        </NavLink></li>

                        <RightOutlined />

                        <li><p>{product[0].tenloai}</p></li>

                        <RightOutlined />

                        <li style={{ textTransform: 'capitalize' }}><p>{product[0].tenctloai}</p></li>

                        <RightOutlined />

                        <li style={{ color: '#e95221' }}><p>{product[0].tensanpham}</p></li>
                    </ul>
                </div>
            </div>
            <div style={{ padding: '0 45px' }} className="container">
                <Row>
                    <Col span={8}>
                        <div className="product_img_detail">
                            <img src={product[0].url_hinhanh} alt="" />
                        </div>
                    </Col>

                    <Col span={10}>
                        <div className="detail_desc">
                            <h1 className="title_product">
                                {product[0].tensanpham}
                            </h1>
                            <div className="product_top_clearfix">
                                <span>
                                    Mã:
                                    <span style={{ color: '#E95221', fontWeight: '500' }}> VNB{product[0].idsanpham} </span>
                                </span>
                            </div>

                            <div className="inventory_quantity">
                                <div className="mb-break">
                                    Thương hiệu:
                                    <span style={{ color: '#E95221' }}> {product[0].tenthuonghieu}</span>
                                </div>
                                <span class="line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <div className="mb-break">
                                    Tình trạng:
                                    <span style={{ color: '#E95221' }}>{isAvailable(product) ? ' Còn hàng' : ' Hết hàng'}</span>
                                </div>
                            </div>

                            <form action="" method="post">
                                <input type="hidden" name="userId" value={userId} />
                                <input type="hidden" name="idsanpham" value={product[0].idsanpham} />
                                <input type="hidden" name="hinhanh" value={product[0].url_hinhanh} />
                                <input type="hidden" name="soluong" value={product[0].soluong} />
                                <input type="hidden" name="tensanpham" value={product[0].tensanpham} />
                                <input type="hidden" name="giasanpham" value={product[0].giasanpham} />

                                <div className="pricebox_clearfix">
                                    <div className="special_price">
                                        <span>{formattedPrice.toLocaleString()}₫</span>
                                    </div>
                                    <div className="old_price">
                                        Giá niêm yết:&nbsp;
                                        <del>{formattedOldPrice.toLocaleString()}₫</del>

                                    </div>
                                </div>

                                <fieldset className="product_discount">

                                    <legend>
                                        <img src="https://cdn.shopvnb.com/themes/images/code_dis.gif" alt="" />
                                        ƯU ĐÃI
                                    </legend>

                                    <div className="product_promotion_list">
                                        <p>✔ Tặng 1 đôi vớ cầu lông VNB &#40; vớ <span>VNB nhiều màu </span> hoặc vớ <span> VNB ngắn &#41;</span></p>
                                        <p>✔ Tặng 1 đôi vớ cầu lông VNB &#40; vớ <span>VNB nhiều màu </span> hoặc vớ <span> VNB ngắn &#41;</span></p>
                                        <p>✔ Tặng 1 đôi vớ cầu lông VNB &#40; vớ <span>VNB nhiều màu </span> hoặc vớ <span> VNB ngắn &#41;</span></p>
                                        <p>✔ Tặng 1 đôi vớ cầu lông VNB &#40; vớ <span>VNB nhiều màu </span> hoặc vớ <span> VNB ngắn &#41;</span></p>
                                    </div>
                                </fieldset>
                                <div className="form-product">
                                    <div className="select_size">
                                        {isProductWithSize && (
                                            <div style={{ marginBottom: '15px' }} className="size_clearfix">
                                                <p>Chọn size:</p>
                                                <div className="group_size">
                                                    {product.sort((a, b) => a.idsize - b.idsize).map((size, index) => (
                                                        <div className="select_size_input" key={index}>
                                                            <input
                                                                type="radio"
                                                                id={`size${index}`}
                                                                name="size"
                                                                value={size.namesize}
                                                                onChange={handleSizeChange}
                                                                disabled={size.soluong <= 0}
                                                            />
                                                            <label htmlFor={`size${index}`} className={size.namesize === selectedSize || size.soluong < 1 ? 'disable' : 'selected'}>
                                                                {size.namesize}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="input_number_product">
                                            <button type="button" className="decrease-btn" onClick={handleDecreaseQuantity}>-</button>
                                            <input
                                                style={{ width: '100px', textAlign: 'center' }}
                                                className="quantity-input"
                                                type="text"
                                                value={quantity}
                                                maxLength="2"
                                                onPaste={handlePaste}
                                                onKeyDown={handleKeyDown}
                                                onChange={(e) => setQuantity(e.target.value)}

                                            />

                                            <button type="button" className="increase-btn" onClick={handleIncreaseQuantity}>+</button>
                                        </div>
                                        <div style={{ marginTop: '20px', width: '300px' }} className="bot_form">
                                            <div onClick={handleAddToCart} className="btn-regis">
                                                <button onClick={handleSubmit} type="submit">Thêm vào giỏ hàng</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>


            {showModal && (
                <div className="container_popup">
                    <div className={`header_popcart ${showModal ? 'show' : 'hide'}`}>
                        <div className="topcart_header">
                            <span>
                                <CheckCircleOutlined />
                                Thêm sản phẩm vào giỏ hàng thành công
                            </span>
                        </div>
                        <div className="media_content">
                            <div style={{ width: '100px' }} className="thump">
                                <img style={{ width: '100%', height: '100%' }} src={product[0].url_hinhanh} alt="" />
                            </div>
                            <div style={{ paddingLeft: '15px' }} className="body_content">
                                <h4 style={{ fontSize: '14px' }} className="title_product">{product[0].tensanpham}</h4>
                                <div className="product_new_price">
                                    <b style={{ marginRight: '15px' }}>{formattedPrice.toLocaleString()}₫</b>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div className="bottom_action">
                            <div onClick={handleCloseModal} className="cart_btn_close">
                                <p style={{ fontSize: '14px' }}>Tiếp tục mua hàng</p>
                            </div>
                            <div className="cart_btn_cart">
                                <NavLink style={{ textDecoration: 'none', color: '#fff' }} to="/cart">
                                    Xem giỏ hàng
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ProductInfo;