<?php
require './connect.php';
?>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Truy cập thông tin "username" và "password"
    $username = $data['username'];
    $password = $data['password'];
    $query = "SELECT * from account where username='$username' and password='$password'";
    $result = pg_query($conn, $query);
    $row = pg_fetch_assoc($result);
    if (!$result) {
        echo 'Truy vấn không thành công!';
    } else {
        $data = pg_fetch_all($result);
        $role = $row['role'];
        if (!$data) {
            $data = array('success' => false, 'message' => 'Đăng nhập không thành công');
            echo json_encode($data);
        } else if ($role == 1){
            $name = $row['name'];
            $data = array('success' => true, 'name' => $name,'role' => 'admin', 'message' => 'Đăng nhập thành công');
            echo json_encode($data);
        }else{
            $name = $row['name'];
            $data = array('success' => true, 'name' => $name,'role' => 'client', 'message' => 'Đăng nhập thành công');
            echo json_encode($data);
        }
    }
}
?>