<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../connect.php';
require './imgbb.php';

// Nhận dữ liệu từ frontend React.js
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Kiểm tra giá trị của $_POST và $_FILES
    if (isset($_POST['tensanpham'], $_POST['giasanpham'], $_POST['mota'], $_FILES['hinhanh'], $_POST['id_thuonghieu'], $_POST['id_loai'], $_POST['id_size'], $_POST['soluong'])) {
        $tensanpham = $_POST['tensanpham'];
        $giasanpham = $_POST['giasanpham'];
        $mota = $_POST['mota'];
        $hinhanh = $_FILES['hinhanh'];
        $id_thuonghieu = $_POST['id_thuonghieu'];
        $id_loai = $_POST['id_loai'];
        $ten_loai = $_POST['ten_loai'];
        $ten_thuonghieu = $_POST['ten_thuonghieu'];
        $soluong = $_POST['soluong'];
        $id_size = $_POST['id_size'];

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
        $sqlCheckProduct = "SELECT sp.idsanpham, sp.tensanpham, ss.idsize
                            FROM sanpham sp
                            INNER JOIN size_sanpham ss ON sp.idsanpham = ss.idsanpham
                            WHERE LOWER(sp.tensanpham) = LOWER($1) AND ss.idsize = $2";
        $paramsCheckProduct = array($tensanpham, $id_size);
        $resultCheckProduct = pg_query_params($conn, $sqlCheckProduct, $paramsCheckProduct);
        $existingProduct = pg_fetch_assoc($resultCheckProduct);


        $sqlCheckProduct1 = "SELECT sp.idsanpham, sp.tensanpham
        FROM sanpham sp
        INNER JOIN size_sanpham ss ON sp.idsanpham = ss.idsanpham
        WHERE LOWER(sp.tensanpham) = LOWER($1)";
        $paramsCheckProduct1 = array($tensanpham);
        $resultCheckProduct1 = pg_query_params($conn, $sqlCheckProduct1, $paramsCheckProduct1);
        $existingProduct1 = pg_fetch_assoc($resultCheckProduct1);

        if ($existingProduct) {
            // Sản phẩm đã tồn tại với cùng kích thước, cập nhật số lượng trong bảng "size_sanpham"
            $sqlUpdateQuantity = "UPDATE size_sanpham SET soluong = soluong + $1 WHERE idsanpham = $2 AND idsize = $3";
            $paramsUpdateQuantity = array($soluong, $existingProduct['idsanpham'], $id_size);
            $resultUpdateQuantity = pg_query_params($conn, $sqlUpdateQuantity, $paramsUpdateQuantity);

            if ($resultUpdateQuantity) {
                $response = array('message' => 'Cập nhật số lượng sản phẩm thành công!');
                echo json_encode($response);
            } else {
                $response = array('message' => 'Có lỗi xảy ra khi cập nhật số lượng sản phẩm!');

                echo json_encode($response);
            }
        } else if ($existingProduct1) {
            $sqlUpdateQuantity = "INSERT INTO size_sanpham(idsanpham,idsize,soluong) values ($1,$2,$3)";
            $paramsUpdateQuantity = array($existingProduct1['idsanpham'], $id_size, $soluong);
            $resultUpdateQuantity = pg_query_params($conn, $sqlUpdateQuantity, $paramsUpdateQuantity);

            if ($resultUpdateQuantity) {
                $response = array('message' => 'Cập nhật số lượng sản phẩm thành công!');
                echo json_encode($response);
            } else {
                $response = array('message' => 'Có lỗi xảy ra khi cập nhật số lượng sản phẩm!');

                echo json_encode($response);
            }

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
                $sqlInsertSize = "INSERT INTO size_sanpham (idsanpham, idsize, soluong) VALUES ($1, $2, $3)";
                $paramsInsertSize = array($id_sanpham, $id_size, $soluong);
                $resultInsertSize = pg_query_params($conn, $sqlInsertSize, $paramsInsertSize);

                if ($resultInsertSize) {
                    $response = array('message' => 'Thêm sản phẩm và cập nhật số lượng thành công!');
                    echo json_encode($response);
                } else {
                    $response = array('message' => 'Có lỗi xảy ra khi thêm dữ liệu kích thước!');

                    echo json_encode($response);
                }
            } else {
                $response = array('message' => 'Có lỗi xảy ra khi thêm sản phẩm!');

                echo json_encode($response);
            }
        }

    }

}