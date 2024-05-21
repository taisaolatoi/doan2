<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = isset($_GET['search']) ? $_GET['search'] : null;

    if ($query != null) {
        $sql = "SELECT * FROM sanpham WHERE LOWER(tensanpham) LIKE LOWER('%$query%')";
        $result = pg_query($conn, $sql);
        $data = pg_fetch_all($result);
        echo json_encode($data);
    }else{
        $sql = "SELECT * FROM sanpham";
        $result = pg_query($conn, $sql);
        $data = pg_fetch_all($result);
        echo json_encode($data);
    }

    // Tiếp tục xử lý kết quả truy vấn và hiển thị thông tin sản phẩm tại đây
}
?>