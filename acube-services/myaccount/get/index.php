<?php
include('../../users/config.php');
include('../../config/log_handler.php');

    get_user_data();



/** Function to Get Product **/
function get_user_data() {
  $data = json_decode(file_get_contents("php://input"));

  $USERID = $_GET['USERID'];
  $qry = "SELECT * FROM VIEW_AUTHENTICATION WHERE USERID = '$USERID'";
  $qry_res = mysql_query($qry);
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "USERID" => $rows['USERID'],
      "PASSWORD" => $rows['PASSWORD'],
      "FULLNAME" => $rows['FULLNAME'],
      "MOBILE" => $rows['MOBILE'],
      "AVATAR" => $rows['AVATAR'],
      "PERMISSIONS" =>[$rows["ROLE"]],
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
