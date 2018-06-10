<?php
include('../../users/config.php');
include('../../config/log_handler.php');

get_customer_data();

/** Function to Get Product **/
function get_customer_data() {
  $data = json_decode(file_get_contents("php://input"));
  $qry = "SELECT * FROM VIEW_MARKETINGBASKET ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysql_query($qry);
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "ID" => $rows['ID'],
      "NAME" => $rows['NAME'],
      "MOBILE" => $rows['MOBILE'],
      "STATUS" => $rows['STATUS'],
      "COMMENT" =>$rows["COMMENT"],
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