import React, { useState, useEffect } from 'react';
import { Modal, Button, Upload, Input, message, Pagination } from 'antd';
import { CloseSquareFilled, StarFilled, UploadOutlined } from '@ant-design/icons';
import Logo from '../../assest/img/logo.svg'

import axios from 'axios';
const Review = ({ product }) => {

    const [id] = useState(product[0].idsanpham);
    const userId = localStorage.getItem('client');
    const [orders, setOrders] = useState('');
    const [namesizes, setNamesizes] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [fileInput, setFileInput] = useState(null);
    const [productname] = useState(product[0].tensanpham)
    const [dataratings, setDataratings] = useState([]);


    // Mã hiển thị danh sách nhận xét và phân trang
    const pageSize = 3; // Số lượng nhận xét mỗi trang
    const totalReviews = dataratings.length; // Tổng số nhận xét

    // State để lưu trữ trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);

    // Hàm để xử lý sự kiện khi người dùng chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Tính chỉ số bắt đầu và kết thúc của nhận xét trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Lọc danh sách nhận xét cho trang hiện tại
    const currentReviews = dataratings.slice(startIndex, endIndex);


    const handleRating = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleOpenModal = () => {
        // Kiểm tra nếu sản phẩm hiện tại không trùng khớp với orders.idsanpham
        const currentProductId = product[0].idsanpham; // ID của sản phẩm hiện tại
        let hasPurchased = false;
        let hasCommented = false;

        if (orders && orders.length > 0) {
            // Duyệt qua tất cả các đơn hàng trong orders
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].idsanpham === currentProductId) {
                    hasPurchased = true;
                    break; // Thoát khỏi vòng lặp nếu tìm thấy sản phẩm đã mua
                }
            }
        }

        if (dataratings && dataratings.length > 0) {
            // Duyệt qua tất cả các đánh giá trong ratings
            for (let i = 0; i < dataratings.length; i++) {
                if (dataratings[i].idkhachhang === userId && dataratings[i].masanpham === currentProductId) {
                    hasCommented = true;
                    break;
                }
            }
        }
        if (!userId) {
            message.warning('Bạn cần đăng nhập để đánh giá.');
            return;
        } else if (!hasPurchased) {
            message.warning('Bạn chưa mua sản phẩm này.');
            return;
        } else if (hasCommented) {
            message.warning('Bạn đã đánh giá sản phẩm này rồi.');
            return;
        }

        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            const id = localStorage.getItem('client');
            try {
                const response = await fetch(`http://localhost/doan2/phpbackend/getorder.php?userId=${id}`);

                if (response.status === 200) {
                    // Xử lý phản hồi thành công
                    const result = await response.json();
                    setOrders(result);

                    const namesizes = result
                        .filter(order => order.idsanpham === product[0].idsanpham)
                        .map(order => order.namesize);
                    setNamesizes(namesizes);
                } else {
                    // Xử lý phản hồi không thành công
                    console.error(response.statusText);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrders();
    }, []);

    const ratingCounts = [];
    for (let i = 5; i >= 1; i--) {
        const count = dataratings.filter(rating => rating.rating == i).length;
        ratingCounts.push(count);
    }


    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await axios.get('http://localhost/doan2/phpbackend/rating.php', {
                    params: {
                        idsanpham: product[0].idsanpham
                    }
                });
                if (response.data.success) {
                    const commentsData = response.data.data; // Lấy dữ liệu từ response.data.data
                    setDataratings(commentsData);
                } else {
                    console.error('Lỗi khi lấy dữ liệu bình luận');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRatings();
    }, []);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('id', product[0].idsanpham);
        formData.append('userId', localStorage.getItem('client'));
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('hinhanh', fileInput);
        formData.append('namesize', namesizes);



        fetch('http://localhost/doan2/phpbackend/rating.php', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    message.success('Đánh giá đã được gửi thành công!');
                    handleCloseModal();
                } else {
                    message.error('Đã xảy ra lỗi khi gửi đánh giá.');
                }
            })
            .catch((error) => {
                message.error('Đã xảy ra lỗi khi gửi đánh giá.');
            });
    };

    // Tính tổng các giá trị đánh giá
    const totalRating = dataratings.reduce((sum, rating) => sum + parseInt(rating.rating, 10), 0);



    const averageRating = totalRating / dataratings.length;
    const ratingValue = isNaN(averageRating) ? 0 : averageRating.toFixed(1);


    return (
        <>
            <div className="box_review">
                <h2 className="title_review">{productname}</h2>
                <div className="box_review_flex">
                    <div className="box_score">
                        <p className="title_score">{ratingValue}/5</p>
                        <div className="">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className="icon">
                                    {index + 1 <= Math.floor(averageRating) ? (
                                        <StarFilled style={{ color: '#f59e0b' }} />
                                    ) : (
                                        <StarFilled />
                                    )}
                                </div>
                            ))}
                        </div>
                        <p>
                            <strong>{dataratings.length}</strong> đánh giá và nhận xét
                        </p>
                    </div>
                    <div className="box_start">
                        <div className="rating_level">
                            <div className="start_count">
                                <span>5</span>
                                <StarFilled style={{ color: '#f59e0b', marginLeft: '5px' }} />
                            </div>
                            <span>{ratingCounts[0]} Đánh giá</span>
                        </div>

                        <div className="rating_level">
                            <div className="start_count">
                                <span>4</span>
                                <StarFilled style={{ color: '#f59e0b', marginLeft: '5px' }} />
                            </div>
                            <span>{ratingCounts[1]} Đánh giá</span>
                        </div>

                        <div className="rating_level">
                            <div className="start_count">
                                <span>3</span>
                                <StarFilled style={{ color: '#f59e0b', marginLeft: '5px' }} />
                            </div>
                            <span>{ratingCounts[2]} Đánh giá</span>
                        </div>

                        <div className="rating_level">
                            <div className="start_count">
                                <span>2</span>
                                <StarFilled style={{ color: '#f59e0b', marginLeft: '5px' }} />
                            </div>
                            <span>{ratingCounts[3]} Đánh giá</span>
                        </div>

                        <div className="rating_level">
                            <div className="start_count">
                                <span>1</span>
                                <StarFilled style={{ color: '#f59e0b', marginLeft: '5px' }} />
                            </div>
                            <span>{ratingCounts[4]} Đánh giá</span>
                        </div>
                    </div>
                </div>

                <p style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>Bạn đánh giá sao sản phẩm này?</p>
                <div className="btn-regis">
                    <button onClick={handleOpenModal}>Đánh giá ngay</button>
                </div>




                <hr />
                {currentReviews.map((ratings) => (
                    <div className="box_cmt_review">
                        <div style={{ width: '100px' }} className="product_rating">
                            <p>{ratings.name}</p>
                        </div>
                        <div className="product_rating_content">
                            <div className="start_rating">
                                {Array.from({ length: ratings.rating }, (_, index) => (
                                    <StarFilled key={index} style={{ color: '#f59e0b', marginLeft: '5px' }} />
                                ))}
                                {Array.from({ length: 5 - ratings.rating }, (_, index) => (
                                    <StarFilled key={index} style={{ marginLeft: '5px' }} />
                                ))}
                            </div>
                            <div className="time_size">
                                <p>{ratings.thoigian} | Phân loại hàng : Size {ratings.namesize}</p>
                            </div>
                            <div className="comment_rating">
                                <p style={{ fontSize: '16px' }}>{ratings.comment}</p>
                            </div>
                            <div className="img_product">
                                <img style={{ width: '70px' }} src={ratings.url_hinhanh} alt="" />
                            </div>

                            <div className="admin_container">
                                <div className="box_name">
                                    <div style={{ marginRight: '10px' }} className="box_avt">
                                        <img src={Logo} alt="" />
                                    </div>
                                    <p>Quản Trị Viên</p>
                                    <span className="box-info__tag">QTV</span>
                                </div>
                                <div className="rep_rating">
                                    <p>Cảm ơn bạn nhiều ạ! Shop chúc bạn luôn vui vẻ và mạnh khỏe Đừng quên ghé shop để tiêp tục mua sắm thêm những sản phẩm hấp dẫn khác nhé</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalReviews}
                    onChange={handlePageChange}
                />


                <Modal
                    title="Đánh giá sản phẩm"
                    visible={isModalVisible}
                    onCancel={handleCloseModal}
                    footer={[
                        <Button key="cancel" onClick={handleCloseModal}>Hủy</Button>,
                        <Button key="submit" type="primary" onClick={handleSubmit}>Gửi</Button>,
                    ]}
                >
                    <p>Upload ảnh:</p>
                    <input type="file" onChange={(e) => setFileInput(e.target.files[0])} />


                    <p>Nhận xét:</p>
                    <Input.TextArea onChange={(e) => setComment(e.target.value)} placeholder="Nhập nhận xét của bạn" />
                    <p style={{ margin: '10px 0' }}>Bạn cảm thấy sản phẩm như thế nào?</p>
                    <div style={{ margin: '0 auto' }} className="box_score">
                        <div className="">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                    key={star}
                                    className={`icon ${star <= rating ? 'selected' : ''}`}
                                    onClick={() => handleRating(star)}
                                >
                                    <StarFilled style={{ fontSize: '24px', color: star <= rating ? '#f59e0b' : '' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                </Modal>
            </div>
        </>
    )
}
export default Review;