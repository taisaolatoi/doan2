<?php
// Kết nối đến cơ sở dữ liệu
require './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Lấy ID từ tham số truyền vào
    $id = $_GET['id'];

    // Sử dụng Prepared Statement và parameterized query
    $sql0 = "DELETE from thongtinkh where makhachhang = $id";
    $result0 = pg_query($conn,$sql0);

    $sql1 = "DELETE from comment where idnguoidung = $id";
    $result1 = pg_query($conn,$sql1);

    $sql = "DELETE FROM account WHERE id = $1";
    $params = array($id);

    $result = pg_query_params($conn, $sql, $params);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Xóa tài khoản thành công']);
    } else {
        echo json_encode(['error' => 'Lỗi khi xóa tài khoản']);
    }
}
?>