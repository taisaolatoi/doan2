<?php
require './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['madonhang'];
    $query = "SELECT * 
    FROM ctdon where madonhang = $id";

    $result = pg_query($conn, $query);
    if (!$result) {
        echo "Truy vấn không thành công";
    } else {
        $data = pg_fetch_all($result);
        if (!$data) {
            echo json_encode($data);
        } else {
            echo json_encode($data);

        }
    }
}



?>