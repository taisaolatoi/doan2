<?php
// Kết nối đến cơ sở dữ liệu
require './connect.php';

// Truy vấn để lấy dữ liệu từ bảng account
$sql = "SELECT * FROM account";
$result = pg_query($conn, $sql);

if (!$result) {
    echo json_encode(['error' => 'Lỗi khi truy vấn cơ sở dữ liệu']);
} else {
    $data = pg_fetch_all($result);
    echo json_encode($data);
}
?>