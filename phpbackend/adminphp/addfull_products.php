<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../connect.php';
require './imgbb.php';

// Nhận dữ liệu từ frontend React.js
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Kiểm tra giá trị của $_POST và $_FILES
    if (isset($_POST['tensanpham'], $_POST['giasanpham'], $_POST['mota'], $_FILES['hinhanh'], $_POST['id_thuonghieu'], $_POST['id_loai'])) {
        $tensanpham = $_POST['tensanpham'];
        $giasanpham = $_POST['giasanpham'];
        $mota = $_POST['mota'];
        $hinhanh = $_FILES['hinhanh'];
        $id_thuonghieu = $_POST['id_thuonghieu'];
        $id_loai = $_POST['id_loai'];
        $ten_loai = $_POST['ten_loai'];
        $ten_thuonghieu = $_POST['ten_thuonghieu'];

        // Tải lên hình ảnh lên Cloudinary

        $url = uploadImageAndGetUrl($hinhanh['tmp_name']);


        // Thực hiện truy vấn SELECT để lấy ID từ bảng thương hiệu
        $sqlThuongHieu = "SELECT idthuonghieu FROM thuonghieu WHERE idthuonghieu = $1";
        $resultThuongHieu = pg_query_params($conn, $sqlThuongHieu, array($id_thuonghieu));
        $rowThuongHieu = pg_fetch_assoc($resultThuongHieu);
        $id_thuonghieu = $rowThuongHieu['idthuonghieu'];

        // Thực hiện truy vấn SELECT để lấy ID từ bảng loai
        $sqlLoai = "SELECT idloai FROM loaisanpham WHERE idloai = $1";
        $resultLoai = pg_query_params($conn, $sqlLoai, array($id_loai));
        $rowLoai = pg_fetch_assoc($resultLoai);
        $id_loai = $rowLoai['idloai'];

        // Chuẩn bị câu lệnh INSERT
        $id_ctloai = null;
        $sqlCheckTenCTLoai = "SELECT * FROM ctloai WHERE tenctloai = $1";
        $resultCheckTenCTLoai = pg_query_params($conn, $sqlCheckTenCTLoai, array($ten_loai . ' ' . $ten_thuonghieu));

        if (pg_num_rows($resultCheckTenCTLoai) > 0) {
            // Nếu tenctloai đã tồn tại, báo lỗi và ngừng chạy
            $row = pg_fetch_assoc($resultCheckTenCTLoai);
            $id_ctloai = $row['idctloai'];
        }

        if (!$id_ctloai) {
            $sqlChiTietLoai = "INSERT INTO ctloai (idloai, tenctloai) VALUES ($1, $2)";
            $resultChiTietLoai = pg_query_params($conn, $sqlChiTietLoai, array($id_loai, $ten_loai . ' ' . $ten_thuonghieu));

        }

        // Kiểm tra kết quả thêm dữ liệu mới và gửi phản hồi về frontend

        // Kiểm tra sản phẩm có tồn tại trong bảng "sanpham3" với cùng tên và kích thước
        $sqlCheckProduct = "SELECT sp.idsanpham, sp.tensanpham
                            FROM sanpham sp
                            WHERE LOWER(sp.tensanpham) = LOWER($1)";
        $paramsCheckProduct = array($tensanpham);
        $resultCheckProduct = pg_query_params($conn, $sqlCheckProduct, $paramsCheckProduct);
        $existingProduct = pg_fetch_assoc($resultCheckProduct);





        if ($ten_loai == 'Giày Cầu Lông') {
            $getSizeVot = "SELECT * FROM size WHERE id > 5 ORDER BY id";
        } else if ($ten_loai == 'Áo Cầu Lông' || $ten_loai == 'Quần Cầu Lông' || $ten_loai == 'Váy Cầu Lông') {
            $getSizeVot = "SELECT * FROM size WHERE id BETWEEN 1 AND 5 ORDER BY id";
        } else {
            $getSizeVot = "SELECT * FROM size WHERE id = 0";
        }
        $stmt = pg_prepare($conn, "get_size_query", $getSizeVot);
        $resultGetSizeVot = pg_execute($conn, "get_size_query", array());






        if ($existingProduct) {
            $response = array('message' => 'Sản phẩm đã tồn tại!');
            echo json_encode($response);

        } else {
            if ($id_ctloai === null) {
                $sqlInsertProduct = "INSERT INTO sanpham (tensanpham, giasanpham, url_hinhanh, mota, idthuonghieu, idloai,idctloai)
             VALUES ($1, $2, $3, $4, $5, $6,(SELECT idctloai from ctloai order by idctloai desc limit 1)) RETURNING idsanpham";
                $paramsInsertProduct = array($tensanpham, $giasanpham, $url, $mota, $id_thuonghieu, $id_loai);
                $resultInsertProduct = pg_query_params($conn, $sqlInsertProduct, $paramsInsertProduct);
            } else {
                $sqlInsertProduct = "INSERT INTO sanpham (tensanpham, giasanpham, url_hinhanh, mota, idthuonghieu, idloai,idctloai)
            VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING idsanpham";
                $paramsInsertProduct = array($tensanpham, $giasanpham, $url, $mota, $id_thuonghieu, $id_loai, $id_ctloai);
                $resultInsertProduct = pg_query_params($conn, $sqlInsertProduct, $paramsInsertProduct);
            }

            if ($resultInsertProduct) {
                $rowInsertProduct = pg_fetch_assoc($resultInsertProduct);
                $id_sanpham = $rowInsertProduct['idsanpham'];

                // Thêm vào bảng "size_sanpham"
                while ($rowSize = pg_fetch_assoc($resultGetSizeVot)) {
                    $id_size = $rowSize['id']; // Lấy id của size từ kết quả truy vấn
                    $soluong = 0; // Đặt số lượng ban đầu là 0 hoặc giá trị mặc định khác

                    // Thêm vào bảng "size_sanpham"
                    $sqlInsertSize = "INSERT INTO size_sanpham (idsanpham, idsize, soluong) VALUES ($1, $2, $3)";
                    $paramsInsertSize = array($id_sanpham, $id_size, $soluong);
                    $resultInsertSize = pg_query_params($conn, $sqlInsertSize, $paramsInsertSize);

                    if (!$resultInsertSize) {
                        // Xử lý khi có lỗi xảy ra
                        $response = array('message' => 'Có lỗi xảy ra khi thêm dữ liệu kích thước!');
                        echo json_encode($response);
                        exit; // Dừng chương trình
                    }
                }
            } else {
                $response = array('message' => 'Có lỗi xảy ra khi thêm sản phẩm!');

                echo json_encode($response);
            }
        }

    }
}

