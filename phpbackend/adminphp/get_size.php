<?php
require '../connect.php';

// Lấy danh sách id_size và namesize từ bảng size
$id = $_GET['idsanpham'];
$sqlSize = "SELECT size_sanpham.*, size.namesize
FROM size_sanpham
JOIN size ON size_sanpham.idsize = size.id
WHERE size_sanpham.idsanpham = $id order by size.id";
$result = pg_query($conn, $sqlSize);
$sizeOptions = [];

if ($result) {
    while ($row = pg_fetch_assoc($result)) {
        $id_size = $row['idsize'];
        $namesize = $row['namesize'];
        $soluong = $row['soluong'];

        $sizeOption = [
            'idsize' => $id_size,
            'namesize' => $namesize,
            'soluong' => $soluong
        ];
        $sizeOptions[] = $sizeOption;
    }
}

echo json_encode($sizeOptions);
?>