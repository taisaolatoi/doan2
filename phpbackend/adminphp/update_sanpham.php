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
        $soluong = $_POST['soluong'];
        $id_size = $_POST['id_size'];
        $id_loai = $_POST['id_loai'];
        if (isset($_FILES['hinhanh']) && $_FILES['hinhanh']['error'] === 0) {
            $hinhanh = $_FILES['hinhanh'];
        } else {
            $hinhanh = null; // hoặc bất kỳ giá trị nào khác thích hợp cho trường hợp không có hình ảnh
        }


        // Upload ảnh và lấy URL
        $url = null;
        if (isset($_FILES['hinhanh'])) {
            $url = uploadImageAndGetUrl($hinhanh['tmp_name']);
        }

        // Chuẩn bị câu lệnh UPDATE cho bảng sản phẩm
        // Chuẩn bị câu lệnh UPDATE cho bảng sản phẩm
        $sqlUpdateProduct = "UPDATE sanpham SET tensanpham = $1, giasanpham = $2, mota = $3, idthuonghieu = $4, idloai = $5";
        $paramsUpdateProduct = array($tensanpham, $giasanpham, $mota, $id_thuonghieu, $id_loai);

        // Chỉ cập nhật hình ảnh nếu 'hinhanh' không phải là null
        if ($url) {
            $sqlUpdateProduct .= ", url_hinhanh = " . pg_escape_literal($url);
        }

        $sqlUpdateProduct .= " WHERE idsanpham = $6 RETURNING idsanpham";
        $paramsUpdateProduct[] = $id;

        // Xử lý kiểu dữ liệu cho tham số trước khi truyền vào hàm pg_query_params
        foreach ($paramsUpdateProduct as $key => $value) {
            if (is_string($value)) {
                $paramsUpdateProduct[$key] = pg_escape_string($conn, $value);
            }
        }

        $resultUpdateProduct = pg_query_params($conn, $sqlUpdateProduct, $paramsUpdateProduct);

        if ($resultUpdateProduct) {
            $rowUpdateProduct = pg_fetch_assoc($resultUpdateProduct);
            $id_sanpham = $rowUpdateProduct['idsanpham'];

            // Cập nhật bảng "size_sanpham"
            $sqlUpdateSize = "UPDATE size_sanpham SET idsize = $1, soluong = $2 WHERE idsanpham = $3 and idsize = $1";
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