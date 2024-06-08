import { NavLink } from "react-router-dom";
import { RightOutlined, CheckCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { Col, Row } from 'antd'
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Comment = ({ product }) => {
    const [id] = useState(product[0].idsanpham);
    const userId = localStorage.getItem('client')

    const [commentContent, setCommentContent] = useState('');

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post('http://localhost/doan2/phpbackend/submit_comment.php', {
                content: commentContent,
                userId: userId,
                idsanpham: id
            });

            if (response.data.success) {
                // Xử lý thành công
                toast.success('Bình luận đã được gửi thành công');
            } else {
                // Xử lý không thành công
                toast.error('Đã xảy ra lỗi khi gửi bình luận');
            }
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra khi gửi bình luận');
        }
    };

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
        </div>
    );
};

export default Comment;