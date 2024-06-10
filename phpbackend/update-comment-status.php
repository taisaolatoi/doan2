<?php
require './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_POST = json_decode(file_get_contents('php://input'), true);
    // Lấy ID đơn hàng và trạng thái mới từ request
    $idcomment = $_POST['selectedCommentID'];
    $trangthai = $_POST['handleStatusChange'];

    // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
    $query = "UPDATE comment
              SET trangthai = '$trangthai'
              WHERE idcomment = $idcomment";

    $result = pg_query($conn, $query);
    if (!$result) {
        http_response_code(500);
        echo json_encode(['error' => 'Cập nhật trạng thái đơn hàng không thành công']);
    } else {
        http_response_code(200);
        echo json_encode(['message' => 'Cập nhật trạng thái đơn hàng thành công']);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT comment.idcomment,comment.thoigian, comment.content, account.name, sanpham.tensanpham, comment.trangthai FROM comment JOIN account ON account.id = comment.idnguoidung JOIN sanpham ON sanpham.idsanpham = comment.masanpham  ORDER BY comment.idcomment";
    $result = pg_query($conn, $sql);

    if ($result) {
        $data = pg_fetch_all($result);
        $response = array('success' => true, 'data' => $data, 'message' => 'Lấy dữ liệu thành công');
        echo json_encode($data);
    } else {
        // Trả về lỗi nếu có lỗi xảy ra trong quá trình thực hiện truy vấn SQL
        $response = array('success' => false, 'message' => 'Không thể lấy dữ liệu bình luận');
        echo json_encode($response);
    }
}

?>