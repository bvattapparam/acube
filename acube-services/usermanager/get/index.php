<?php
include('../../users/config.php');
include('../../config/log_handler.php');

get_user_data();

/** Function to Get Product **/
function get_user_data() {
  global $con;
  $data = json_decode(file_get_contents("php://input"));
  $qry = "SELECT * FROM VIEW_AUTHENTICATION ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysqli_query($con,$qry);
  $data = array();
    
  while($rows = mysqli_fetch_array($qry_res))
  {
    $data[] = array(
      "USERID" => $rows['USERID'],
      "FULLNAME" => $rows['FULLNAME'],
      "MOBILE" => $rows['MOBILE'],
      "AVATAR" => $rows['AVATAR'],
      "ROLE" =>[$rows["ROLE"]],
      "CREATEDBY" => $rows['CREATEDBY'],
      "CREATEDDATE" => $rows['CREATEDDATE'],
      "MODIFIEDBY" =>$rows['MODIFIEDBY'],
      "MODIFIEDDATE" => $rows['MODIFIEDDATE']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

?>