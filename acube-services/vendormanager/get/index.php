<?php
include('../../users/config.php');
include('../../config/log_handler.php');
switch($_GET['action']) {
  case 'get_vendor' :
      get_vendor();
      break;
    case 'get_vendors' :
      get_vendors();
      break;
}

/** Function to Get Product **/
function get_vendor() {
  $data = json_decode(file_get_contents("php://input"));

  $VENDORID = $_GET['VENDORID'];
  

  $qry = "SELECT * FROM VIEW_VENDOR_MASTER 
  WHERE VENDORID = '$VENDORID' 
  ORDER BY MODIFIEDDATE DESC";

  $qry_res = mysql_query($qry);
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "ID"            =>  $rows['ID'],
      "VENDORID"      =>  $rows['VENDORID'],
      "NAME"          =>  $rows['NAME'],
      "MOBILE"        =>  $rows['MOBILE'],
      "EMAIL"         =>  $rows['EMAIL'],
      "ADDRESS"       =>  $rows['ADDRESS'],
      "CONTACTPERSON" =>  $rows['CONTACTPERSON'],
      "COMMENT"       =>  $rows['COMMENT'],
      "STATUS"        =>  $rows['STATUS'],
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
function get_vendors() {
  $data = json_decode(file_get_contents("php://input"));

  $qry = "SELECT * FROM VIEW_VENDOR_MASTER ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysql_query($qry);
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "ID"                =>  $rows['ID'],
      "VENDORID"          =>  $rows['VENDORID'],
      "NAME"              =>  $rows['NAME'],
      "MOBILE"            =>  $rows['MOBILE'],
      "EMAIL"             =>  $rows['EMAIL'],
      "CONTACTPERSON"     =>  $rows['CONTACTPERSON'],
      "ADDRESS"           =>  $rows['ADDRESS'],
      "COMMENT"           =>  $rows['COMMENT'],
      "STATUS"            =>  $rows['STATUS'],
      "CREATEDBY"         =>  $rows['CREATEDBY'],
      "CREATEDDATE"       =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"        =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"      =>  $rows['MODIFIEDDATE']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

?>