<?php
 require './connect.php';

 if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT 
        donhang.madonhang,
        sanpham.masanpham,
        ctdon.soluong,
        donhang.tonggia
    FROM donhang
    JOIN chitietdonhang ON donhang.madonhang = ctdon.madonhang
    JOIN sanpham ON ctdon.masanpham = sanpham.masanpham
    WHERE donhang.madonhang = :madonhang;";

    $params = array(':madonhang' => $_GET['madonhang']);
    $result = pg_query_params($conn, $query, $params);
    if (!$result) {
        echo "Truy vấn không thành công";
    } else {
        $data = pg_fetch_all($result);
        if (!$data) {
            echo "Không có dữ liệu trả về";
        } else {
            echo json_encode($data);
        }
    }
}
?>