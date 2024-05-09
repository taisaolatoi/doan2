<?php
    require './connect.php';
?>
<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $query = "SELECT * FROM sanpham";
        $result = pg_query($conn, $query);
        if (!$result) {
            echo "Truy vấn không thành công";
        } else {
            $data = pg_fetch_all($result);
            if (!$data) {
                echo "Không có dữ liệu trả về";
            } else {
                echo json_encode($data);
            }
        }
    }

?>
