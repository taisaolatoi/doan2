<?php
require '../connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_POST = json_decode(file_get_contents('php://input'), true);
    $tenthuonghieu = $_POST['name'];

    // Sử dụng `idthuonghieu` thay vì `id`
    $sql = "INSERT INTO thuonghieu (tenthuonghieu) VALUES ('$tenthuonghieu') RETURNING idthuonghieu";
    $result = pg_query($conn, $sql);

    if ($result) {
        $row = pg_fetch_assoc($result);
        $data = array('idthuonghieu' => $row['idthuonghieu'], 'success' => true, 'message' => 'Thêm thành công');
    } else {
        $data = array('success' => false, 'message' => 'Thêm thất bại');
    }
    echo json_encode($data);
}
?>
