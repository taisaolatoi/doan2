<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require '../connect.php';

// Nhận dữ liệu từ frontend React.js
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['idsanpham'])) {
        $id_sanpham = $_GET['idsanpham'];

        // Truy vấn để lấy thông tin sản phẩm theo id_sanpham
        $sqlProduct = "SELECT sp.idsanpham, sp.tensanpham, sp.giasanpham, sp.mota, sp.url_hinhanh, sp.idthuonghieu, sp.idloai, ss.idsize, ss.soluong
                       FROM sanpham sp
                       INNER JOIN size_sanpham ss ON sp.idsanpham = ss.idsanpham
                       WHERE sp.idsanpham = $1";
        $resultProduct = pg_query_params($conn, $sqlProduct, array($id_sanpham));

        if ($resultProduct) {
            $productData = pg_fetch_assoc($resultProduct);
            if ($productData) {
                // Trả về dữ liệu sản phẩm dưới dạng JSON
                echo json_encode($productData);
            } else {
                $response = array('message' => 'Không tìm thấy sản phẩm!');
                echo json_encode($response);
            }
        } else {
            $response = array('message' => 'Có lỗi xảy ra khi truy vấn cơ sở dữ liệu!');
            echo json_encode($response);
        }
    } else {
        $response = array('message' => 'Thiếu ID sản phẩm!');
        echo json_encode($response);
    }
}
?>
