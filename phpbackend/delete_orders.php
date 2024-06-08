<?php
require './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $madonhang = isset($_GET['madonhang']) ? $_GET['madonhang'] : '';

    if ($madonhang) {
        // Tạo câu truy vấn để lấy giá trị idthongtin_kh từ bảng donhang
        $query_select = "SELECT id_thongtinkh FROM donhang WHERE madonhang = $madonhang";
        $result_select = pg_query($conn, $query_select);
        $row = pg_fetch_assoc($result_select);
        $idthongtin_kh = $row['id_thongtinkh'];

        if ($idthongtin_kh) {
            // Xóa dữ liệu trong bảng ctdon
            $query1 = "DELETE FROM ctdon WHERE madonhang = $madonhang";
            $result1 = pg_query($conn, $query1);

            // Xóa dữ liệu trong bảng thongtin_kh
            $query2 = "DELETE FROM thongtinkh WHERE id_thongtinkh = $idthongtin_kh";
            $result2 = pg_query($conn, $query2);

            // Xóa dữ liệu trong bảng donhang
            $query = "DELETE FROM donhang WHERE madonhang = $madonhang";
            $result = pg_query($conn, $query);

            if ($result) {
                $response = array(
                    'success' => true,
                    'message' => 'Xóa đơn hàng thành công'
                );
            } else {
                $response = array(
                    'success' => false,
                    'message' => 'Xóa đơn hàng không thành công'
                );
            }

            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = array(
                'success' => false,
                'message' => 'Không tìm thấy idthongtin_kh trong bảng donhang'
            );

            header('Content-Type: application/json');
            echo json_encode($response);
        }
    } else {
        $response = array(
            'success' => false,
            'message' => 'Không có id đơn hàng được truyền vào'
        );

        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
?>