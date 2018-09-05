<?php
include('../../users/config.php');
include('../../config/log_handler.php');


switch($_GET['action']) {
  case 'get_locations' :
        get_locations();
    break;
    case 'get_prefill_content' :
        get_prefill_content();
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


/** Function to Get Product **/
function get_prefill_content() {
  global $con;
  $data = json_decode(file_get_contents("php://input"));

  $qry = "SELECT * FROM VIEW_REF_PRECONTENT ORDER BY ID ASC";
  $qry_res = mysqli_query($con,$qry);
  $data = array();
    
  while($rows = mysqli_fetch_array($qry_res))
  {
    $data[] = array(
      "ID" => $rows['ID'],
      "CONTENT" => $rows['CONTENT'],
      "CATEGORY" => $rows['CATEOGRY']
    );
  }
echo(json_encode($data));
return json_encode($data);
}


?>