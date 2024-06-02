<?php
require '../connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $_DELETE = json_decode(file_get_contents('php://input'), true);
    $idthuonghieu = $_DELETE['id'];

    // Check if there are any products associated with the brand
    $sql_check_product = "SELECT COUNT(*) FROM sanpham WHERE idthuonghieu = $idthuonghieu";
    $result_check_product = pg_query($conn, $sql_check_product);
    $row = pg_fetch_row($result_check_product);
    $product_count = $row[0];

    if ($product_count > 0) {
        // If there are products associated with the brand, return an error message
        $data = array('success' => false, 'message' => 'Không thể xóa thương hiệu vì có sản phẩm liên kết');
    } else {
        // If there are no products associated with the brand, proceed with deletion
        $sql = "DELETE FROM thuonghieu WHERE idthuonghieu = $idthuonghieu";
        $result = pg_query($conn, $sql);

        if ($result) {
            $data = array('success' => true, 'message' => 'Xóa thành công');
        } else {
            $data = array('success' => false, 'message' => 'Xóa thất bại');
        }
    }
    echo json_encode($data);
}
?>
