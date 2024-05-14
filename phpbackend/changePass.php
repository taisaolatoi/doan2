<?php
require './connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_POST = json_decode(file_get_contents('php://input'), true);

    // Lấy dữ liệu từ form
    $userId = $_POST['userId'];
    $currentPassword = $_POST["currentPassword"];
    $newPassword = $_POST["newPassword"];
    $confirmNewPassword = $_POST["confirmNewPassword"];

    $sql = "SELECT password FROM account WHERE id = $userId";
    $result = pg_query($conn, $sql);
    $userData = pg_fetch_assoc($result);
    $storedPassword = $userData['password'];

    // Sử dụng hàm password_verify để so sánh mật khẩu đã băm
    if (password_verify($currentPassword, $storedPassword)) {
        // Kiểm tra mật khẩu mới và mật khẩu xác nhận mới
        if ($newPassword === $confirmNewPassword) {
            // Băm mật khẩu mới trước khi cập nhật vào cơ sở dữ liệu
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            // Cập nhật mật khẩu mới trong cơ sở dữ liệu
            $updateSql = "UPDATE account SET password = '$hashedPassword' WHERE id = $userId";
            $updateResult = pg_query($conn, $updateSql);

            if ($updateResult) {
                $data = array('success' => true, 'message' => 'Đổi mật khẩu thành công!');
                echo json_encode($data);
            } else {
                $data = array('success' => false, 'message' => 'Cập nhật mật khẩu thất bại');
                echo json_encode($data);
            }
        } else {
            $data = array('success' => false, 'message' => 'Mật khẩu mới và mật khẩu xác nhận không khớp');
            echo json_encode($data);
        }
    } else {
        $data = array('success' => false, 'message' => 'Mật khẩu hiện tại không chính xác');
        echo json_encode($data);
    }
}
?>