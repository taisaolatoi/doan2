<?php
require './connect.php';
require 'adminphp/imgbb.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $userid = $_POST['userId'];
    $hinhanh = $_FILES['hinhanh'];
    $rating = $_POST['rating'];
    $namesize = $_POST['namesize'];
    $comment = $_POST['comment'];
    $url = uploadImageAndGetUrl($hinhanh['tmp_name']);
    $thoigian = date('Y-m-d H:i:s', strtotime('+5 hours')); // Lấy giờ và ngày tháng hiện tại


    // Sử dụng kết nối PDO để thực hiện truy vấn SQL
    $sql = "INSERT INTO ratings (masanpham, idkhachhang, url_hinhanh, rating, comment,namesize,thoigian) VALUES ('$id','$userid', '$url', '$rating', '$comment','$namesize','$thoigian')";
    $result = pg_query($conn, $sql);
    if ($result) {
        echo json_encode(array('message' => 'Đánh giá đã được gửi thành công'));
    } else {
        echo json_encode(array('error' => 'Đã xảy ra lỗi khi lưu hình ảnh'));

    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['idsanpham'];

    $sql = "SELECT ratings.*,account.name FROM ratings JOIN account ON ratings.idkhachhang = account.id 
where ratings.masanpham = $id";
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