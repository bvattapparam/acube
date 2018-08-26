<?php
 
/****************************************************
			Database configuration						
****************************************************/
global $host;
$host = "localhost"; 
$user = "ACUBE"; 
$pass = "GENACUBE"; 
$database = "acube";

// $host = "localhost"; 
// $user = "ACUBE2018"; 
// $pass = "GENACUBE2018123$"; 
// $database = "acube";
global $con;
$con = mysqli_connect($host,$user,$pass);
 
if (!$con) {
die('Sorry not able to connect, please contact DB administrator for more details ' . mysql_error());
}
 
mysqli_select_db($con,$database);

?>