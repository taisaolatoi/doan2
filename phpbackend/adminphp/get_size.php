<?php
require '../connect.php';

// Lấy danh sách id_size và namesize từ bảng size
$sqlSize = "SELECT id, namesize FROM size";
$result = pg_query($conn, $sqlSize);
$sizeOptions = [];

if ($result) {
    while ($row = pg_fetch_assoc($result)) {
        $id_size = $row['id'] ;
        $namesize = $row['namesize'];
        
        $sizeOption = [
            'id' => $id_size,
            'namesize' => $namesize
        ];
        $sizeOptions[] = $sizeOption;
    }
}

echo json_encode($sizeOptions);
?> 