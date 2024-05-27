    <?php
   require '../connect.php'; 


    session_start();


    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $role = ($_POST['role'] === 'admin') ? 1 : 0;
        $name = $_POST['name'];

        // Chuẩn bị câu truy vấn SQL
        $sql = "INSERT INTO account (username, password, role, name) VALUES ('$username', '$password', '$role', '$name')";

        // Thực hiện câu truy vấn
        $result = pg_query($conn, $sql);

        if ($result) {
            $response = [
                'success' => true,
                'message' => 'Account created successfully',
                'username' => $username,
                'role' => $role
            ];
            echo json_encode($response);
        } else {
            $response = [
                'success' => false,
                'message' => 'Error: ' . pg_last_error($conn)
            ];
            echo json_encode($response);
        }
    }
    ?>