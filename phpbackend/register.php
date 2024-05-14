<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $_POST = json_decode(file_get_contents('php://input'), true);

  // Lấy dữ liệu từ biểu mẫu đăng ký
  $username = $_POST['username'];
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $password = $_POST['password'];
  $repassword = $_POST['repassword'];

  // Kiểm tra xem tên người dùng đã tồn tại hay chưa
  $query1 = "SELECT username FROM account WHERE username = '$username'";
  $result1 = pg_query($conn, $query1);

  if (pg_num_rows($result1) > 0) {
    echo 'Tên người dùng đã tồn tại!';
  } elseif ($password !== $repassword) {
    echo 'Mật khẩu không khớp!';
  } else {
    $hashedPassword = pg_escape_literal(password_hash($password, PASSWORD_DEFAULT));
    $query2 = "INSERT INTO account (username, password, name, phone, email) VALUES ('$username', '$hashedPassword', '$name', '$phone', '$email')";
    $result2 = pg_query($conn, $query2);

    if ($result2) {
      $data = array('success' => true, 'username' => $username, 'message' => 'Đăng ký thành công');
      echo json_encode($data);
    } else {
      echo 'Đăng ký thất bại!';
    }
  }
}
?>