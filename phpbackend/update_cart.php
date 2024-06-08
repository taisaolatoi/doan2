<?php
require './connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productIndex = $_POST["productIndex"];
    $quantity = $_POST["quantity"];

    // Truy vấn SQL để cập nhật số lượng sản phẩm
    $sql = "UPDATE products SET soluong = $quantity WHERE idsanpham = $productIndex";

    if ($conn->query($sql) === TRUE) {
        echo "Số lượng đã được cập nhật thành công!";
    } else {
        echo "Có lỗi xảy ra khi cập nhật số lượng: " . $conn->error;
    }
}

$conn->close();
?>
