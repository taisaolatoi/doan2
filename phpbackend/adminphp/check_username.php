<?php
require '../connect.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $username = $_GET['username'];

    // Chuẩn bị câu truy vấn SQL
    $sql = "SELECT EXISTS(SELECT 1 FROM account WHERE username = '$username')";

    // Thực hiện câu truy vấn
    $result = pg_query($conn, $sql);

    if ($result) {
        $row = pg_fetch_row($result);
        $exists = ($row && $row[0] === 't') ? true : false;

        $response = [
            'exists' => $exists
        ];
        echo json_encode($response);
    } else {
        $response = [
            'exists' => false
        ];
        echo json_encode($response);
    }
}
?>