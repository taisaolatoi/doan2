<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require '../connect.php';
require './imgbb.php';



// Nhận dữ liệu từ frontend React.js
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['id'], $_POST['tensanpham'], $_POST['giasanpham'], $_POST['mota'], $_POST['id_thuonghieu'], $_POST['id_loai'], $_POST['id_size'], $_POST['soluong'])) {
        $id = $_POST['id'];
        $tensanpham = $_POST['tensanpham'];
        $giasanpham = $_POST['giasanpham'];
        $mota = $_POST['mota'];
        $id_thuonghieu = $_POST['id_thuonghieu'];
        $id_loai = $_POST['id_loai'];
        $ten_loai = $_POST['ten_loai'];
        $ten_thuonghieu = $_POST['ten_thuonghieu'];
        $soluong = $_POST['soluong'];
        $id_size = $_POST['id_size'];
        $hinhanh = $_POST['hinhanh'];
        $url = null;
        $publicId = null;

        if (isset($_FILES['hinhanh'])) {
            $url = uploadImageAndGetUrl($hinhanh['tmp_name']);
        }

        // Chuẩn bị câu lệnh UPDATE cho bảng sản phẩm
        $sqlUpdateProduct = "UPDATE sanpham SET tensanpham = $1, giasanpham = $2, mota = $3, idthuonghieu = $4, idloai = $5";
        $paramsUpdateProduct = array($tensanpham, $giasanpham, $mota, $id_thuonghieu, $id_loai);

        if ($url) {
            $sqlUpdateProduct .= "url_hinhanh = $7";
            $paramsUpdateProduct[] = $url;
        }

        $sqlUpdateProduct .= " WHERE idsanpham = $8 RETURNING idsanpham";
        $paramsUpdateProduct[] = $id;

        $resultUpdateProduct = pg_query_params($conn, $sqlUpdateProduct, $paramsUpdateProduct);

        if ($resultUpdateProduct) {
            $rowUpdateProduct = pg_fetch_assoc($resultUpdateProduct);
            $id_sanpham = $rowUpdateProduct['id_sanpham'];

            // Cập nhật bảng "size_sanpham"
            $sqlUpdateSize = "UPDATE size_sanpham SET id_size = $1, soluong = $2 WHERE idsanpham = $3";
            $paramsUpdateSize = array($id_size, $soluong, $id_sanpham);
            $resultUpdateSize = pg_query_params($conn, $sqlUpdateSize, $paramsUpdateSize);

            if ($resultUpdateSize) {
                $response = array('message' => 'Cập nhật sản phẩm thành công!');
                echo json_encode($response);
            } else {
                $response = array('message' => 'Có lỗi xảy ra khi cập nhật kích thước sản phẩm!');
                echo json_encode($response);
            }
        } else {
            $response = array('message' => 'Có lỗi xảy ra khi cập nhật sản phẩm!');
            echo json_encode($response);
        }
    }
}
?>