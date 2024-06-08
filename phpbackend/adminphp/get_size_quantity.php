<?php
require '../connect.php';

// Nhận dữ liệu từ frontend React.js
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['size'])) {
        $size = $_GET['size'];
        $idsanpham = $_GET['idsanpham'];

        // Truy vấn để lấy số lượng của kích thước
        $sqlQuantity = "SELECT soluong FROM size_sanpham JOIN 
        size on size_sanpham.idsize = size.id
         WHERE size_sanpham.idsize = $1 and size_sanpham.idsanpham = $2";
        $resultQuantity = pg_query_params($conn, $sqlQuantity, array($size,$idsanpham));

        if ($resultQuantity) {
            $quantityData = pg_fetch_assoc($resultQuantity);
            if ($quantityData) {
                // Trả về số lượng của kích thước dưới dạng JSON
                echo json_encode($quantityData);
            } else {
                $response = array('message' => 'Không tìm thấy số lượng cho kích thước đã chọn!');
                echo json_encode($response);
            }
        } else {
            $response = array('message' => 'Có lỗi xảy ra khi truy vấn cơ sở dữ liệu!');
            echo json_encode($response);
        }
    } else {
        $response = array('message' => 'Thiếu thông tin về kích thước!');
        echo json_encode($response);
    }
}
?>