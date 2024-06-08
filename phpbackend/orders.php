<?php
require './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT 
        donhang.madonhang,
        thongtinkh.hoten,
        donhang.ngaydat,
        donhang.tonggia,
        donhang.pttt,
        donhang.trangthai,
		ctdon.idsize
    FROM donhang
    JOIN thongtinkh
	ON donhang.id_thongtinkh = thongtinkh.id_thongtinkh
	JOIN ctdon on ctdon.madonhang = donhang.madonhang
	order by donhang.madonhang;";

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