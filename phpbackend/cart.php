<?php
require 'connect.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_POST = json_decode(file_get_contents('php://input'), true);

    $userId = $_POST['userId'];
    $productId = $_POST['id'];
    $productImg = $_POST['img'];
    $productName = $_POST['name'];
    $productPrice = $_POST['price'];
    $productQuantity = $_POST['quantity'];
    $productSize = isset($_POST['selectedSize']) ? $_POST['selectedSize'] : '';
    $productSizeId = isset($_POST['sizeId']) ? $_POST['sizeId'] : '';


    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    $checkSql = "SELECT * FROM cart WHERE idsanpham = $productId AND idnguoidung = $userId AND size = '$productSize'";
    $checkResult = pg_query($conn, $checkSql);

    if (pg_num_rows($checkResult) > 0) {
        // Nếu sản phẩm đã tồn tại với kích thước tương tự, cập nhật số lượng
        $row = pg_fetch_assoc($checkResult);
        $newQuantity = $row['soluong'] + $productQuantity;
        $updateSql = "UPDATE cart SET soluong = '$newQuantity' WHERE idsanpham = $productId AND idnguoidung = $userId AND size = '$productSize'";
        $updateResult = pg_query($conn, $updateSql);
        if ($updateResult) {
            echo json_encode(['success' => true, 'message' => 'Số lượng sản phẩm đã được cập nhật trong giỏ hàng']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng']);
        }
    } else {
        // Nếu sản phẩm không tồn tại hoặc có kích thước khác, thêm vào giỏ hàng
        $sql = "INSERT INTO cart(idsanpham, hinhanh, tensanpham, giasanpham, soluong, idnguoidung, size, idsize) VALUES ('$productId', '$productImg', '$productName', '$productPrice', '$productQuantity', '$userId', '$productSize', '$productSizeId')";
        $result = pg_query($conn, $sql);
        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Sản phẩm đã được thêm vào giỏ hàng']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi khi thêm sản phẩm vào giỏ hàng']);
        }
    }
}
?>