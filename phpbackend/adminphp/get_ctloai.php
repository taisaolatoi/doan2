<?php
require '../connect.php'; // kết nối đến cơ sở dữ liệu

// Lấy dữ liệu từ bảng "loại"
$sqlLoai = "SELECT * FROM ctloai";
$resultLoai = pg_query($conn, $sqlLoai);
$loaiOptions = [];
while ($rowLoai = pg_fetch_assoc($resultLoai)) {
  $ctloaiOption = [
    'idctloai' => $rowLoai['idctloai'],
    'tenctloai' => $rowLoai['tenctloai'],
  ];
  $ctloaiOptions[] = $ctloaiOption;
}


echo json_encode($ctloaiOptions);
?>