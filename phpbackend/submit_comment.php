<?php
require './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy dữ liệu từ yêu cầu POST
    $_POST = json_decode(file_get_contents('php://input'), true);

    $content = $_POST['content'];
    $userId = $_POST['userId'];
    $idsanpham = $_POST['idsanpham'];
    $trangthai = 'Chờ Duyệt';
    $thoigian = date('Y-m-d H:i:s', strtotime('+5 hours')); // Lấy giờ và ngày tháng hiện tại

    // Thực hiện truy vấn SQL để chèn bình luận vào cơ sở dữ liệu
    $sql = "INSERT INTO comment(content, idnguoidung, masanpham, trangthai, thoigian) VALUES ('$content', '$userId', '$idsanpham', '$trangthai', '$thoigian')";
    $result = pg_query($conn, $sql);

    if ($result) {
        // Trả về kết quả thành công cho client
        $response = array('success' => true);
        echo json_encode($response);
    } else {
        // Trả về lỗi nếu có lỗi xảy ra trong quá trình thực hiện truy vấn SQL
        $response = array('success' => false, 'message' => 'Không thể thêm bình luận');
        echo json_encode($response);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['idsanpham'];
    $sql = "SELECT comment.idcomment,comment.thoigian, comment.content, account.name, sanpham.tensanpham, comment.trangthai FROM comment JOIN account ON account.id = comment.idnguoidung JOIN sanpham ON sanpham.idsanpham = comment.masanpham where comment.masanpham = $id  ORDER BY comment.idcomment";
    $result = pg_query($conn, $sql);

    if ($result) {
        $data = pg_fetch_all($result);
        $response = array('success' => true, 'data' => $data, 'message' => 'Lấy dữ liệu thành công');
        echo json_encode($response);
    } else {
        // Trả về lỗi nếu có lỗi xảy ra trong quá trình thực hiện truy vấn SQL
        $response = array('success' => false, 'message' => 'Không thể lấy dữ liệu bình luận');
        echo json_encode($response);
    }
}
?>