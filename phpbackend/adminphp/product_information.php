<?php
require '../connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sql = "SELECT idsanpham,tensanpham, giasanpham, url_hinhanh, mota FROM sanpham";
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