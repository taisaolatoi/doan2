<?php
require '../connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sql = "SELECT sanpham.idsanpham, sanpham.tensanpham, sanpham.giasanpham, sanpham.url_hinhanh, sanpham.mota, thuonghieu.tenthuonghieu 
          FROM sanpham 
          JOIN thuonghieu ON sanpham.idthuonghieu = thuonghieu.idthuonghieu";
  $result = pg_query($conn, $sql);

  if (!$result) {
    $response = [
      'success' => false,
      'message' => 'Error: ' . pg_last_error($conn)
    ];
    echo json_encode($response);
    exit;
  }

  $data = [];
  while ($row = pg_fetch_assoc($result)) {
    $data[] = $row;
  }

  echo json_encode($data);
} else {
  $response = [
    'success' => false,
    'message' => 'Unsupported request method'
  ];
  echo json_encode($response);
}
?>