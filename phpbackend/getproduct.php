<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = isset($_GET['id']) ? $_GET['id'] : '';
    $sort = isset($_GET['sort']) ? $_GET['sort'] : 'default';

    $query = "SELECT sanpham.*, ctloai.tenctloai, loaisanpham.tenloai
        FROM sanpham 
        JOIN ctloai ON sanpham.idctloai = ctloai.idctloai 
        JOIN loaisanpham ON sanpham.idloai = loaisanpham.idloai
        WHERE ctloai.idctloai = $id ";

    // Điều kiện sắp xếp
    if ($sort === 'priceAsc') {
        $query .= " ORDER BY sanpham.giasanpham ASC";
    } elseif ($sort === 'priceDesc') {
        $query .= " ORDER BY sanpham.giasanpham DESC";
    } elseif ($sort === 'newest') {
        $query .= " ORDER BY sanpham.idsanpham DESC";
    } else {
        $query .= " ORDER BY sanpham.idsanpham ASC"; // Thêm default sort
    }

    $result = pg_query($conn, $query);

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