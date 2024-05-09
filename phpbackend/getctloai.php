<?php
    require './connect.php';
?>

<?php 

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $query = "SELECT 
        loaisanpham.tenloai AS tenloai,
        json_agg(json_build_object('tenctloai', ctloai.tenctloai, 'idloai', ctloai.idloai, 'idctloai',ctloai.idctloai)) AS ctloai
        FROM ctloai
        INNER JOIN loaisanpham ON ctloai.idloai = loaisanpham.idloai
        GROUP BY loaisanpham.tenloai, ctloai.idloai
        ORDER BY ctloai.idloai;";
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