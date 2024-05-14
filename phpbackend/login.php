<?php
require './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Truy cập thông tin "username" và "password"
    $username = $data['username'];
    $password = $data['password'];

    // Truy vấn cơ sở dữ liệu để lấy mật khẩu đã lưu cho username tương ứng
    // Truy vấn cơ sở dữ liệu để lấy mật khẩu đã lưu cho username tương ứng
    $query = "SELECT * FROM account WHERE username='$username'";
    $result = pg_query($conn, $query);
    if (!$result) {
        echo 'Truy vấn không thành công!';
    } else {
        $numRows = pg_num_rows($result);
        if ($numRows > 0) {
            $row = pg_fetch_array($result);
            $storedPassword = $row['password'];
            if (password_verify($password, $storedPassword)) {
                $role = $row['role'];
                $id = $row['id'];
                $data = array('success' => true, 'id' => $id, 'role' => ($role == 1 ? 'admin' : 'client'), 'message' => 'Đăng nhập thành công');
                echo json_encode($data);
            } else {
                $data = array('success' => false, 'message' => 'Mật khẩu không đúng');
                echo json_encode($data);
            }
        } else {
            $data = array('success' => false, 'message' => 'Tài khoản không tồn tại');
            echo json_encode($data);
        }
    }
}
?>