<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Credentials: true');


$conn = pg_connect("host=localhost dbname=caulong3 user=postgres password=1234");
return $conn;
?>