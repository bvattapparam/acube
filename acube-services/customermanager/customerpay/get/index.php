<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

get_customerpay();

/** Function to Get Product **/
function get_customerpay() {
  $data = json_decode(file_get_contents("php://input"));

  $CUSTOMERID = $data->CUSTOMERID;
  $qry = "SELECT * FROM VIEW_CUSTOMER_PAY WHERE CUSTOMERID = '$CUSTOMERID' ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysql_query($qry);
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "ID"            =>  $rows['ID'],
      "CUSTOMERID"    =>  $rows['CUSTOMERID'],
      "DATE"          =>  $rows['DATE'],
      "PURPOSE"       =>  $rows['PURPOSE'],
      "AMOUNT"        =>  $rows['AMOUNT'],
      "MODE"          =>  $rows['MODE'],
      "REFNUMBER"     =>  $rows['REFNUMBER'],
      "COMMENT"       =>  $rows['COMMENT'],
      "CREATEDBY"     =>  $rows['CREATEDBY'],
      "CREATEDDATE"   =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE']
    );
  }
  
echo(json_encode($data));
return json_encode($data);
}


?>