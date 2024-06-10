import { InboxOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from 'axios';
import { message } from 'antd';
import Logo from '../../assest/img/logo.svg'

const Comment = ({ product }) => {
    const [id] = useState(product[0].idsanpham);
    const userId = localStorage.getItem('client');

    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState([]);

    const handleCommentSubmit = async () => {
        if (!localStorage.getItem('client')) {
            message.warning('Vui lòng đăng nhập để bình luận');
            return;
        } else if (commentContent.trim() === '') {
            message.warning('Vui lòng nhập nội dung bình luận.'); // Thông báo cho người dùng không để trống trường dữ liệu
            return; // Dừng việc gửi dữ liệu
        }

        try {
            const response = await axios.post('http://localhost/doan2/phpbackend/submit_comment.php', {
                content: commentContent,
                userId: userId,
                idsanpham: id
            });

            if (response) {
                // Xử lý thành công
                message.success('Bình luận đang chờ duyệt!');
                setCommentContent(''); // Reset nội dung bình luận sau khi gửi thành công
            } else {
                // Xử lý không thành công
                message.error('Đã xảy ra lỗi khi gửi bình luận');
            }
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra khi gửi bình luận');
        }
    };


    const getTimeElapsed = (time) => {
        const commentTime = new Date(time);
        const currentTime = new Date();
        const timeDiff = Math.abs(currentTime - commentTime);
        const minutes = Math.floor(timeDiff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return `${years} năm trước`;
        } else if (months > 0) {
            return `${months} tháng trước`;
        } else if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return 'Vừa xong';
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost/doan2/phpbackend/submit_comment.php', {
                    params: {
                        idsanpham: product[0].idsanpham
                    }
                });

                if (response.data.success) {
                    const commentsData = response.data.data; // Lấy dữ liệu từ response.data.data
                    setComments(commentsData);
                } else {
                    console.error('Lỗi khi lấy dữ liệu bình luận');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchComments();
    }, []);

    return (
        <div className="comment_container">
            <div className="comment-form">
                <p>Bình Luận</p>
                <div className="comment-form-content">
                    <div className="textarea-comment">
                        <textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></textarea>
                        <button onClick={handleCommentSubmit}>
                            <InboxOutlined />
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
            <div className="page_cmt_list">
                <hr />
                {comments.map(comment => (
                    comment.trangthai == 'Đã Duyệt' && ( // Kiểm tra nếu trạng thái là 'đã duyệt'
                        <div key={comment.idcomment} className="item_comment">
                            <div className="box_info">
                                <div className="box_name"><p>{comment.name}</p></div>
                                <div className="box_time_cmt">
                                    <FieldTimeOutlined />
                                    <span>{getTimeElapsed(comment.thoigian)}, lúc {comment.thoigian.split(' ')[1].substring(0, 5)} </span>
                                </div>
                            </div>
                            <div className="box_question">
                                <p>{comment.content}</p>
                            </div>
                            <div className="box_rep_cmt">
                                <div className="item_rep_cmt">
                                    <div className="box_info">
                                        <div className="box_name">
                                            <div style={{ marginRight: '10px' }} className="box_avt">
                                                <img src={Logo} alt="" />
                                            </div>
                                            <p>Quản Trị Viên</p>
                                            <span className="box-info__tag">QTV</span>
                                        </div>
                                        <div className="box_time_cmt">
                                            <FieldTimeOutlined />
                                            <span>QTV</span>
                                        </div>
                                    </div>
                                    <div className="box_question">
                                        <p style={{ lineHeight: '20px' }}>Chào <b>{comment.name}</b> <br />
                                            Cừa hàng đã ghi nhận câu hỏi của bạn và sẽ liên lạc trả lời trong thời gian sớm nhất
                                            <br />
                                            Mọi thắc mắc liên quan đến sản phẩm có thể gọi cho hotline: 0347291939
                                            <br />
                                            Xin thông tin đến bạn!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Comment;