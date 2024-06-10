import './checkout.css'
import { BankOutlined, DollarOutlined, LeftOutlined } from '@ant-design/icons'
import logo from '../../assest/img/logo.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { message } from 'antd';

const Checkout = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [data, setData] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(''); // Giá trị mặc định là "COD"
    const [del, setDel] = useState('')
    const [totalPrice, setTotalPrice] = useState(0);
    const Id = localStorage.getItem('client');
    let total = 0;

    const productsData = data.map((product, index) => {
        const formattedPrice = parseFloat(product.giasanpham);
        const totalPrice = total += formattedPrice * product.soluong;
        console.log(product)


        return {
            product_id: product.idsanpham,
            product_name: product.tensanpham,
            product_gia: product.giasanpham,
            product_img: product.hinhanh,
            product_size: product.size,
            product_quantity: product.soluong,
            product_Price: totalPrice,
            product_idsize: product.idsize
        };
    });
    useEffect(() => {
        let totalPrice = 0;
        data.forEach((product) => {
            const formattedPrice = parseFloat(product.giasanpham);
            totalPrice += formattedPrice * product.soluong;
        });
        setTotalPrice(totalPrice);
    }, [data]);

    useEffect(() => {
        const client = localStorage.getItem('client');
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
                        setName(result.data.name);
                        setEmail(result.data.email);
                        setPhone(result.data.phone);
                    } else {
                        console.error(result.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

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
            .then(responseData => {
                if (responseData.success) {
                    setData(responseData.data); // Gán giá trị từ mảng responseData.data cho state data
                } else {
                    console.error(responseData.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email,
            Id,
            name,
            address,
            phone,
            paymentMethod,
            totalPrice,
            products: productsData,
        };

        fetch('http://localhost/doan2/phpbackend/checkout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            message.success('Đặt hàng thành công!!', () => {
                navigate('/');
            });
          } else {
            // Xử lý trường hợp truy vấn không thành công
          }
        })
        .catch(error => {
          console.error(error);
        });


    }

    return (
        <>
            <ToastContainer />
            <form style={{ display: 'flex', flexDirection: 'column' }} method="POST">
                <div id="wrapper">
                    <div className="main">
                        <div className="main_img">
                            <img src={logo} alt="" />
                        </div>
                        <div className="main_content">
                            <div className="buy_info">
                                <strong style={{ marginBottom: '20px' }}>Thông tin mua hàng </strong>
                                <label htmlFor="email">Nhập Email:</label>
                                <input type="email" name="email" placeholder="Email" value={email || ''} onChange={(e) => setEmail(e.target.value)} required />

                                <label htmlFor="fullname">Nhập họ tên:</label>
                                <input type="text" name="fullname" placeholder="Họ và tên" value={name || ''} onChange={(e) => setName(e.target.value)} required />

                                <label htmlFor="phone">Nhập số điện thoại</label>
                                <input type="tel" name="phone" placeholder="Số điện thoại" value={phone || ''} onChange={(e) => setPhone(e.target.value)} required />

                                <label htmlFor="address">Nhập địa chỉ:</label>
                                <input type="text" id="address" name="address" placeholder="Địa chỉ" value={address || ''} onChange={(e) => setAddress(e.target.value)} required />
                            </div>

                            <div className="payment">
                                <strong>Thanh Toán</strong>
                                <div className="payment_all">
                                    <div className="header">
                                        <input type="radio" name="type_payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                                        <p>Thanh toán khi giao hàng (COD) </p>
                                        <DollarOutlined />
                                        <i className="fa-regular fa-money-bill-1"></i>
                                    </div>
                                    <div className="footer">
                                        <input type="radio" name="type_payment" value="Bank" checked={paymentMethod === 'Bank'} onChange={() => setPaymentMethod('Bank')} />
                                        <p>Chuyển khoản qua ngân hàng </p>
                                        <BankOutlined />
                                    </div>
                                    <div className="desc">
                                        <p>Ngân hàng: Vietcombank</p>
                                        <p>Tên tài khoản: VAN PHAT DAT</p>
                                        <p>Số tài khoản: 1021354042</p>
                                        <p>Chi nhánh: Ô Môn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navbar">
                        <div className="navbar_title">
                            <p>Đơn hàng</p>
                        </div>
                        <div className="navbar_all">

                            {data && data.map((product, index) => {
                                const formattedPrice = parseFloat(product.giasanpham);
                                total += formattedPrice * product.soluong;
                                return (
                                    <div className="navbar_cart" key={index}>
                                        <div className="img"><img src={product.hinhanh} alt="" /></div>
                                        <div className="quantity">{product.soluong}</div>
                                        <div className="name">{product.tensanpham}</div>
                                        <div className="price">{formattedPrice.toLocaleString()}đ</div>
                                    </div>
                                )
                            })}

                        </div>

                        <div className="navbar_total">
                            <p>Tổng cộng<span style={{ fontSize: 'x-large' }}>{totalPrice.toLocaleString()}đ</span></p>
                            <input type="hidden" name="totalPrice" value="" />
                            <div className="navbar_footer">
                                <NavLink to="/cart"><LeftOutlined /> Quay về giỏ hàng</NavLink>
                                <input type="submit" name="dathang" onClick={handleSubmit} value="ĐẶT HÀNG" />
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </>
    );
};

export default Checkout;