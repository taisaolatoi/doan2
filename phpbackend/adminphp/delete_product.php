<?php
require '../../connect.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  $data = json_decode(file_get_contents("php://input"), true);
  $productId = $data['id_sanpham'];

  if (!$productId) {
    $response = [
      'success' => false,
      'message' => 'Error: Invalid or missing product ID'
    ];
    echo json_encode($response);
    exit;
  }

  $sql = "DELETE FROM sanpham3 WHERE id_sanpham = $productId";
  $result = pg_query($conn, $sql);

  if ($result) {
    $response = [
      'success' => true,
      'message' => 'Product deleted successfully'
    ];
    echo json_encode($response);
  } else {
    $response = [
      'success' => false,
      'message' => 'Error: ' . pg_last_error($conn)
    ];
    echo json_encode($response);
  }
} else {
  $sql = "SELECT tensanpham, giasanpham, url_hinhanh, soluong, giacu, mota FROM sanpham";
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
}
?>