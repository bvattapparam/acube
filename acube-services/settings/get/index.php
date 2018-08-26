<?php
include('../../users/config.php');
include('../../config/log_handler.php');


switch($_GET['action']) {
  case 'get_locations' :
        get_locations();
    break;
  
}


/** Function to Get Product **/
function get_locations() {
  global $con;
  $data = json_decode(file_get_contents("php://input"));
  $qry = "SELECT * FROM VIEW_REF_LOCATION ORDER BY ID ASC";
  $qry_res = mysqli_query($con,$qry);
  $data = array();
    
  while($rows = mysqli_fetch_array($qry_res))
  {
    $data[] = array(
      "ID" => $rows['ID'],
      "CODE" => $rows['CODE'],
      "NAME" => $rows['NAME'],
      "STATUS" => $rows['STATUS'],
      "MODIFIEDBY" =>$rows['MODIFIEDBY'],
      "MODIFIEDDATE" => $rows['MODIFIEDDATE']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

?>