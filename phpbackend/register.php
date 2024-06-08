<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $_POST = json_decode(file_get_contents('php://input'), true);

  // Lấy dữ liệu từ biểu mẫu đăng ký
  if (isset($_POST['username']) && !empty($_POST['username'])) {
    $username = $_POST['username'];
  } else {
    $data = array('success' => false, 'message' => 'Username không được rỗng!');
    echo json_encode($data);
    exit; // Exit the script after sending the JSON response
  }
  $name = $_POST['name'];
  $phone = $_POST['phone'];

  if (isset($_POST['password']) && !empty($_POST['password'])) {
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];

    $query1 = "SELECT username FROM account WHERE username = '$username'";
    $result1 = pg_query($conn, $query1);

    $query2 = "SELECT phone FROM account WHERE phone = '$phone'";
    $result2 = pg_query($conn, $query2);

    if (pg_num_rows($result1) > 0) {
      $data = array('success' => false, 'message' => 'Tên người dùng đã tồn tại!');
      echo json_encode($data);
      exit; // Exit the script after sending the JSON response
    } elseif (pg_num_rows($result2) > 0) {
      $data = array('success' => false, 'message' => 'Số điện thoại đã tồn tại!');
      echo json_encode($data);
      exit; // Exit the script after sending the JSON response
    } elseif ($password !== $repassword) {
      $data = array('success' => false, 'message' => 'Mật khẩu không khớp!');
      echo json_encode($data);
      exit; // Exit the script after sending the JSON response
    } else {

      $query3 = "INSERT INTO account (username, password, name, phone) VALUES ('$username', '$password', '$name', '$phone')";
      $result3 = pg_query($conn, $query3);

      if ($result3) {
        $data = array('success' => true, 'username' => $username, 'message' => 'Đăng ký thành công');
        echo json_encode($data);
        exit; // Exit the script after sending the JSON response
      } else {
        $data = array('success' => false, 'message' => 'Đăng ký không thành công!');
        echo json_encode($data);
        exit; // Exit the script after sending the JSON response
      }
    }
  } else {
    $data = array('success' => false, 'message' => 'Vui lòng nhập mật khẩu!');
    echo json_encode($data);
    exit; // Exit the script after sending the JSON response
  }
}
?>