<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'get_user_data' :
  get_user_data();
  break;

}

/** Function to Get Product **/
function get_user_data() {
  $data = json_decode(file_get_contents("php://input"));
  $USERID = $data->USERID;
  $PASSWORD = $data->PASSWORD;
  $qry = "SELECT * FROM VIEW_AUTHENTICATION WHERE USERID = '$USERID'  AND PASSWORD = '$PASSWORD'";
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
    //$data_ROLE

   // $data_role=array("ROLE"=> $rows['ROLE']);
   // $data.role[]=array(
     // "ROLE" => $rows['ROLE']);
  }
echo(json_encode($data));
return json_encode($data);
}

?>
