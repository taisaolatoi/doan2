<?php
require './connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_POST = json_decode(file_get_contents('php://input'), true);

    // Lấy dữ liệu từ form
    $userId = $_POST['userId'];
    $email = $_POST["email"];
    $fullName = $_POST["fullName"];
    $phoneNumber = $_POST["phoneNumber"];
    $gender = $_POST["gender"];
    $birthdate = $_POST["birthdate"];

    // Chuyển đổi định dạng ngày sinh cho phù hợp với cú pháp của PostgreSQL
    $birthdate = date("Y-m-d", strtotime($birthdate));

    // Xây dựng truy vấn SQL để cập nhật thông tin người dùng
    $sql = "UPDATE account SET email='$email', name='$fullName', phone='$phoneNumber', gender='$gender', birthday='$birthdate' WHERE id = $userId";

    // Thực thi truy vấn SQL
    $result = pg_query($conn, $sql);
    if ($result) {
        $data = array('success' => true, 'message' => 'Cập nhật thành công!');
        echo json_encode($data);
    } else {
        $data = array('success' => false, 'message' => 'Cập nhật thất bại');
        echo json_encode($data);

    }
}
?>