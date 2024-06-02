<?php
require '../connect.php';



if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  $data = json_decode(file_get_contents("php://input"), true);
  $productId = $data['idsanpham'];

  if (!$productId) {
    $response = [
      'success' => false,
      'message' => 'Error: Invalid or missing product ID'
    ];
    echo json_encode($response);
    exit;
  }

  // Kiểm tra xem sản phẩm có trong ctdon không
  $ctdonCheckSql = "SELECT * FROM ctdon WHERE masanpham = $productId";
  $ctdonCheckResult = pg_query($conn, $ctdonCheckSql);
  $ctdonCheckRows = pg_num_rows($ctdonCheckResult);

  if ($ctdonCheckRows > 0) {
    // Nếu sản phẩm có trong ctdon, không thể xóa
    $response = [
      'success' => false,
      'message' => 'Không thể xóa sản phẩm vì nó đang tồn tại trong ctdon'
    ];
    echo json_encode($response);
    exit;
  }

  // Nếu sản phẩm không trong ctdon, tiến hành xóa
  $deleteSql = "DELETE FROM sanpham WHERE idsanpham = $productId";
  $deleteResult = pg_query($conn, $deleteSql);

  if ($deleteResult) {
    $response = [
      'success' => true,
      'message' => 'Sản phẩm đã được xóa thành công'
    ];
    echo json_encode($response);
  } else {
    $response = [
      'success' => false,
      'message' => 'Lỗi: ' . pg_last_error($conn)
    ];
    echo json_encode($response);
  }
} else {
  $sql = "SELECT tensanpham, giasanpham, url_hinhanh, soluong, giacu, mota FROM sanpham";
  $result = pg_query($conn, $sql);

  if (!$result) {
    $response = [
      'success' => false,
      'message' => 'Lỗi: ' . pg_last_error($conn)
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
