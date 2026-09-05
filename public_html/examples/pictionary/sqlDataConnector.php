<?php 

$servername = "localhost";
$username = "pictionaryAdmin";
$password = "dHse%#678thjDh";

// Create connection
$conn = mysqli_connect($servername, $username, $password);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully<br>";


$sql = "SELECT * FROM easy";
$result = mysqli_query($conn, $sql);

// var_dump($result);
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while ($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"] . " - Name: " . $row["firstname"] . " " . $row["lastname"] . "<br>";
    }
} else {
    echo "0 results";
}

mysqli_close($conn);

?>