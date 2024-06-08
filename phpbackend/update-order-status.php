<?php
require './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_POST = json_decode(file_get_contents('php://input'), true);
    // Lấy ID đơn hàng và trạng thái mới từ request
    $madonhang = $_POST['selectedOrderId'];
    $trangthai = $_POST['handleStatusChange'];
    $idsize = $_POST['idsize'];

    // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
    $query = "UPDATE donhang
              SET trangthai = '$trangthai'
              WHERE madonhang = $madonhang";

    if ($trangthai == 'Đã hủy') {
        $sql = "SELECT * from ctdon where madonhang = $madonhang";
        $resultsql = pg_query($conn, $sql);

        while ($rowSql = pg_fetch_assoc($resultsql)) {
            $masanpham = $rowSql['masanpham'];
            $soluong = $rowSql['soluong'];

            // Thực hiện cập nhật soluong trong bảng size_sanpham cho từng sản phẩm
            $updateSql = "UPDATE size_sanpham SET soluong = soluong + $soluong WHERE idsanpham = $masanpham and idsize = $idsize";
            $resultUpdate = pg_query($conn, $updateSql);
        }
    }

    $result = pg_query($conn, $query);
    if (!$result) {
        http_response_code(500);
        echo json_encode(['error' => 'Cập nhật trạng thái đơn hàng không thành công']);
    } else {
        http_response_code(200);
        echo json_encode(['message' => 'Cập nhật trạng thái đơn hàng thành công']);
    }
}

?>