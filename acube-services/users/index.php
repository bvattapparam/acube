<?php
	//Sample Database Connection Syntax for PHP and MySQL.
	
	//Connect To Database
	
  //echo "tested...";
  
  /*$host = "localhost"; 
$user = "ACUBE"; 
$pass = "GENACUBE"; 
$database = "acube";*/
	
$con=mysqli_connect("localhost","ACUBE2018","GENACUBE2018123$","acube");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="SELECT * FROM tbl_authentication";
$result=mysqli_query($con,$sql);

// Numeric array
//$row=mysqli_fetch_array($result,MYSQLI_NUM);
	
	
	
	//$result = mysqli_query($con,$sql);
	
  //echo $result;
  
	if($result){
		while($row = mysqli_fetch_array($result)){
			$name = $row["USERID"];
			echo "Name: ".$name."<br/>";
		}
	}
?>