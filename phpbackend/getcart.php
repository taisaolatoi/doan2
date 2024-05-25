<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $del = $_GET['del'];
    $userId = $data['userId'];
    $cartId = isset($data['cartId']) ? $data['cartId'] : '';


    $query = "SELECT cart.*, size_sanpham.soluong as soluongdb
    FROM cart
    JOIN size ON cart.idsize = size.id
    JOIN size_sanpham ON size.id = size_sanpham.idsize
    WHERE cart.idnguoidung = $userId and cart.idsanpham = size_sanpham.idsanpham;";
    $result = pg_query($conn, $query);

    if ($del != '') {
        $deleteQuery = "DELETE FROM cart WHERE idsanpham = $del and idnguoidung = $userId and id=$cartId";
        $deleteResult = pg_query($conn, $deleteQuery);
        $data1 = pg_fetch_all($result);
        if ($deleteResult) {
            $response = array('success' => true, 'data' => $data1, 'message' => 'Sản phẩm đã được xóa khỏi giỏ hàng');
        } else {
            $response = array('success' => false, 'message' => 'Lỗi khi xóa sản phẩm khỏi giỏ hàng');
        }
    } else {
        $data1 = pg_fetch_all($result);
        if (!$data1) {
            $response = array('success' => true, 'message' => 'Không có dữ liệu trả về');
        } else {
            $response = array('success' => true, 'data' => $data1);
        }
    }
    echo json_encode($response);
}
?>