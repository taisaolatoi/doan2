<?php
require './connect.php';

header('Content-Type: application/json'); // Đảm bảo rằng dữ liệu trả về là JSON

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = $data['userId'];

    $sql1 = "SELECT a.madonhang, a.tonggia,a.pttt, a.trangthai,a.ngaydat, d.address, d.phone
    FROM donhang a
    INNER JOIN thongtinkh d ON a.id_thongtinkh = d.id_thongtinkh
    WHERE d.makhachhang = $userId";
    $result1 = pg_query($conn, $sql1);
    $orderData = array(); // Tạo mảng để lưu trữ dữ liệu đơn hàng

    while ($row = pg_fetch_assoc($result1)) {
        $madonhang = $row['madonhang'];
        $tonggia = number_format($row['tonggia']) . '₫';
        $phone = $row['phone'];
        $address = $row['address'];
        $ngaydat = $row['ngaydat'];
        $trangthai = $row['trangthai'];
        $pttt = $row['pttt'];
    
        $orderData[] = array(
            'madonhang' => $madonhang,
            'tonggia' => $tonggia,
            'ngaydat' => $ngaydat,
            'phone' => $phone,
            'address' => $address,
            'trangthai' => $trangthai,
            'pttt' => $pttt
        );
        
        // Thực hiện truy vấn SQL thứ hai để lấy thông tin sản phẩm của từng đơn hàng
        $sql2 = "SELECT b.tensanpham, b.url_hinhanh, c.soluong, e.namesize,b.giasanpham
        FROM ctdon c
        INNER JOIN sanpham b ON b.idsanpham = c.masanpham
        INNER JOIN size e ON c.idsize = e.id
        WHERE c.madonhang = $madonhang";
        $result2 = pg_query($conn, $sql2);
        $productData = array(); // Tạo mảng để lưu trữ dữ liệu sản phẩm
    
        while ($row_product = pg_fetch_assoc($result2)) {
            $productData[] = array(
                'tensanpham' => $row_product['tensanpham'],
                'hinhanh' => $row_product['url_hinhanh'],
                'soluong' => $row_product['soluong'],
                'namesize' => $row_product['namesize'],
                'giasanpham' => number_format($row_product['giasanpham']) . '₫',
            );
        }
    
        // Lưu thông tin sản phẩm vào mảng tương ứng với từng đơn hàng
        $orderData[count($orderData) - 1]['productInfo'] = $productData;
    }
    echo json_encode($orderData); // Trả về dữ liệu từ tất cả các đơn hàng và sản phẩm dưới dạng JSON

}
?>