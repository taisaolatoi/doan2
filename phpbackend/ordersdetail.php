<?php
require './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Lấy id từ query string và kiểm tra xem nó có tồn tại không
    $id = isset($_GET['id']) ? $_GET['id'] : '';

    if (isset($_GET['id'])) {   
        $madonhang = $_GET['id'];
        $query = "SELECT b.tensanpham, b.url_hinhanh, c.soluong, e.namesize, b.giasanpham, c.madonhang
        FROM ctdon c
        INNER JOIN sanpham b ON b.idsanpham = c.masanpham
        INNER JOIN size e ON c.idsize = e.id
        WHERE c.madonhang = $madonhang";
        
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
    } else {
        echo "Không có id đơn hàng được truyền vào";
    }
}
?>