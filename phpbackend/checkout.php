<?php
require './connect.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $userId = $data['Id'];
    $email = $data['email'];
    $ngaydat = date('Y-m-d');
    $name = $data['name'];
    $address = $data['address'];
    $phone = $data['phone'];
    $payment = $data['paymentMethod'];
    $products = $data['products'];
    $totalPrice = $data['totalPrice'];

    // Thêm thông tin khách hàng
    $query1 = "INSERT INTO thongtinkh(makhachhang, email, phone, address, hoten) VALUES ('$userId', '$email', '$phone', '$address', '$name')";
    $result1 = pg_query($conn, $query1);

    // Thêm đơn hàng
    $query2 = "INSERT INTO donhang(id_thongtinkh, ngaydat, tonggia, pttt, trangthai) VALUES ((SELECT id_thongtinkh FROM thongtinkh ORDER BY id_thongtinkh DESC LIMIT 1), '$ngaydat', '$totalPrice', '$payment', 'Chờ xác nhận')";
    $result2 = pg_query($conn, $query2);

    // Thêm chi tiết đơn hàng
    foreach ($products as $product) {
        $productId = $product['product_id'];
        $quantity = $product['product_quantity'];
        $size = $product['product_idsize'];

        $sql_insert_detail = "INSERT INTO ctdon (madonhang, masanpham, soluong, idsize) 
        VALUES ((SELECT madonhang FROM donhang ORDER BY madonhang DESC LIMIT 1), 
        '$productId', '$quantity', '$size')";
        $result3 = pg_query($conn, $sql_insert_detail);

        // Thực hiện câu lệnh INSERT vào bảng ctdon ở đây
        $sql_update_size = "UPDATE size_sanpham SET soluong = soluong - $quantity WHERE idsanpham = '$productId' AND idsize = '$size'";
        pg_query($conn, $sql_update_size);
    }

    $query4 = "DELETE FROM cart WHERE idnguoidung = $userId";

    // Thực hiện các câu lệnh SQL
    $result4 = pg_query($conn, $query4);
    if (!$result1 || !$result2 || !$result3 || !$result4) {
        echo 'Thất bại';
        var_dump($userId);
    }

    // Trả về kết quả
    $data = array('success' => true, 'message' => 'Đặt hàng thành công!');
    echo json_encode($data);
    exit;
}
?>