

<?php
require '../connect.php';

$sqlThuongHieu = "SELECT * FROM thuonghieu";
$resultThuongHieu = pg_query($conn, $sqlThuongHieu);
$thuongHieuOptions = [];
while ($rowThuongHieu = pg_fetch_assoc($resultThuongHieu)) {
  $thuongHieuOption = [
    'idthuonghieu' => $rowThuongHieu['idthuonghieu'],
    'tenthuonghieu' => $rowThuongHieu['tenthuonghieu'],
  ];
  $thuongHieuOptions[] = $thuongHieuOption;
}

// Trả về dữ liệu cho phần frontend
echo json_encode($thuongHieuOptions);
?>