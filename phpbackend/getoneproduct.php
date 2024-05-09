<?php 
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Lấy id từ query string và kiểm tra xem nó có tồn tại không
    $id = isset($_GET['id']) ? $_GET['id'] : '';

    // Sử dụng prepared statements để tránh SQL Injection
    $query = "SELECT
    sanpham.*,
    thuonghieu.tenthuonghieu,
    loaisanpham.tenloai,
    ctloai.tenctloai
FROM
    sanpham
    JOIN thuonghieu ON sanpham.idthuonghieu = thuonghieu.idthuonghieu
    JOIN loaisanpham ON sanpham.idloai = loaisanpham.idloai
    JOIN ctloai on sanpham.idctloai = ctloai.idctloai
WHERE
    sanpham.idsanpham = $1";
    $result = pg_prepare($conn, "get_product", $query);
    $result = pg_execute($conn, "get_product", array($id));

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