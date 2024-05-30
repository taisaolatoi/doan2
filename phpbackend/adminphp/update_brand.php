<?php
require '../connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_POST = json_decode(file_get_contents('php://input'), true);
    $idthuonghieu = $_POST['id']; // Lấy 'id' từ body của request
    $tenthuonghieu = $_POST['name'];

    // Truy vấn SQL cập nhật dữ liệu
    $sql = "UPDATE thuonghieu SET tenthuonghieu = '$tenthuonghieu' WHERE idthuonghieu = $idthuonghieu";
    $result = pg_query($conn, $sql);

    if ($result) {
        $data = array('success' => true, 'message' => 'Cập nhật thành công');
    } else {
        $data = array('success' => false, 'message' => 'Cập nhật thất bại');
    }
    echo json_encode($data);
}
?>
