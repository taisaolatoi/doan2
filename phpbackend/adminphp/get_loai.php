<?php
require '../connect.php'; // kết nối đến cơ sở dữ liệu

// Lấy dữ liệu từ bảng "loại"
$sqlLoai = "SELECT * FROM loaisanpham";
$resultLoai = pg_query($conn, $sqlLoai);
$loaiOptions = [];
while ($rowLoai = pg_fetch_assoc($resultLoai)) {
  $loaiOption = [
    'idloai' => $rowLoai['idloai'],
    'tenloai' => $rowLoai['tenloai'],
  ];
  $loaiOptions[] = $loaiOption;
}


echo json_encode($loaiOptions);
?>