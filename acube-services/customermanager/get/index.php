<?php
include('../../users/config.php');
include('../../config/log_handler.php');
switch($_GET['action']) {
  case 'get_customer' :
      get_customer();
      break;
    case 'get_customers' :
      get_customer_data();
      break;
}

/** Function to Get Product **/
function get_customer() {
  $data = json_decode(file_get_contents("php://input"));

  $CUSTOMERID = $_GET['customerid'];
  

  $qry = "SELECT * FROM VIEW_CUSTOMER_MASTER WHERE CUSTOMERID = '$CUSTOMERID' ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysql_query($qry);
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "ID"            =>  $rows['ID'],
      "CUSTOMERID"    =>  $rows['CUSTOMERID'],
      "TYPE"          =>  $rows['TYPE'],
      "FULLNAME"      =>  $rows['FULLNAME'],
      "MOBILE"        =>  $rows['MOBILE'],
      "EMAIL"         =>  $rows['EMAIL'],
      "ADDRESS"       =>  $rows['ADDRESS'],
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

/** Function to Get Product **/
function get_customer_data() {
  $data = json_decode(file_get_contents("php://input"));

  $qry = "SELECT * FROM VIEW_CUSTOMER_MASTER ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysql_query($qry);
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "ID"            =>  $rows['ID'],
      "CUSTOMERID"    =>  $rows['CUSTOMERID'],
      "TYPE"          =>  $rows['TYPE'],
      "FULLNAME"      =>  $rows['FULLNAME'],
      "MOBILE"        =>  $rows['MOBILE'],
      "EMAIL"         =>  $rows['EMAIL'],
      "ADDRESS"       =>  $rows['ADDRESS'],
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