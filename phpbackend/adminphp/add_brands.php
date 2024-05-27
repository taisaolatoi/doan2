<?php  
require '../connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    $tenthuonghieu = $_POST['name'];
    $sql = "INSERT into thuonghieu(tenthuonghieu) values ('$tenthuonghieu')";
    $result = pg_query($conn,$sql);

    if ($result) {
        $data = array('success' => true, 'message' => 'Đăng ký thành công');
    }
}

?>