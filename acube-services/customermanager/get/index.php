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
  case 'get_status_count' :
    get_status_count();
    break;
  case 'get_totals' :
        get_totals();
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
      "STATUS"        =>  $rows['STATUS'],
      "CREATEDBY"     =>  $rows['CREATEDBY'],
      "CREATEDDATE"   =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE'],
      "ESTIMATESTATUS"  =>  $rows['ESTIMATESTATUS'],
      "QUOTEAPPROVED"  =>  $rows['QUOTEAPPROVED']
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
      "STATUS"        =>  $rows['STATUS'],
      "CREATEDBY"     =>  $rows['CREATEDBY'],
      "CREATEDDATE"   =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE'],
      "ESTIMATESTATUS"  =>  $rows['ESTIMATESTATUS'],
      "QUOTEAPPROVED"  =>  $rows['QUOTEAPPROVED']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

function get_status_count() {

  $data = json_decode(file_get_contents("php://input"));

  $qry = "SELECT STATUS, COUNT(*) AS ST FROM VIEW_CUSTOMER_MASTER GROUP BY STATUS ORDER BY COUNT(*) DESC";

  $qry_res = mysql_query($qry);
  $data = array();

  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "STATUS"  => $rows['STATUS'],
      "VALUE" =>  (int) $rows['ST']
    );
  }

  echo(json_encode($data));
  return json_encode($data);
}

function get_totals(){
  $data = json_decode(file_get_contents("php://input"));

  $CUSTOMERID = $data->CUSTOMERID;

  $qry = "SELECT SUM(AMOUNT) AS POAMOUNT FROM VIEW_QUOTE_MASTER WHERE CUSTOMERID = '$CUSTOMERID'";

  $qry_res = mysql_query($qry);
  $data = array();

  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "POAMOUNT"  => $rows['POAMOUNT']
    );
  }

  echo(json_encode($data));
  return json_encode($data);
}

?>