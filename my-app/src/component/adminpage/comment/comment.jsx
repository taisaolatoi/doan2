import axios from "axios";
import { useEffect, useState } from "react";

const Comment = () => {
    const [comment, setComment] = useState([]);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [handleStatusChange, setHandleStatusChange] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await axios.get('http://localhost/doan2/phpbackend/update-comment-status.php');
                if (Array.isArray(response.data)) {
                    setComment(response.data);
                } else {
                    setComment(Object.values(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchComment();
    }, []);



    const handleSubmit = (idcomment) => (e) => {
        e.preventDefault();
        const data = {
            handleStatusChange,
            selectedCommentID: idcomment,
        };

        axios.post('http://localhost/doan2/phpbackend/update-comment-status.php', data)
            .then(response => {
                if (response.data.success) {
                    setHandleStatusChange(response.data);
                } else {
                    console.error('Error from backend');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='container_add'>
            <h1>Danh sách bình luận</h1>
            <table>
                <thead>
                    <tr>
                        <th>Mã Bình Luận</th>
                        <th>Khách Hàng</th>
                        <th>Thời gian</th>
                        <th>Nội dung</th>
                        <th>Sản Phẩm</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {comment.length > 0 ? (
                        comment.map(comment => (
                            <tr key={comment.idcomment}>
                                <td>BL{comment.idcomment}</td>
                                <td>{comment.name}</td>
                                <td>{comment.thoigian}</td>
                                <td>{comment.content}</td>
                                <td>{comment.tensanpham}</td>
                                <td>
                                    <select
                                        defaultValue={comment.trangthai}
                                        name="status"
                                        onChange={(e) => setHandleStatusChange(e.target.value)}
                                    >
                                        <option value="Chờ Duyệt">Chờ Duyệt</option>
                                        <option value="Đã Duyệt">Đã Duyệt</option>
                                    </select>
                                </td>
                                <td>
                                    <form method='POST' onSubmit={handleSubmit(comment.idcomment)}>
                                        <input type="hidden" value={comment.idcomment} name='commentid' onChange={(e) => setSelectedCommentId(e.target.value)} />

                                        <button type="submit">Cập nhật</button>
                                    </form>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Không có bình luận</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Comment;