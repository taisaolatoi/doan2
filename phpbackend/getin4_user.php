<?php
require './connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ phần thân của yêu cầu POST
    $data = json_decode(file_get_contents('php://input'), true);

    // Lấy userId từ dữ liệu
    $userId = $data['userId'];

    // Truy vấn dữ liệu từ cơ sở dữ liệu dựa trên userId
    $sql = "SELECT * FROM account WHERE id = '$userId'";
    $result = pg_query($conn, $sql);
    $row = pg_fetch_assoc($result);
    if ($row) {
        $row['birthday'] = date('Y-m-d', strtotime($row['birthday']));
        echo json_encode(array("success" => true, "data" => $row));
    } else {
        echo json_encode(array("success" => false, "message" => "Không tìm thấy dữ liệu"));
    }
}
?>