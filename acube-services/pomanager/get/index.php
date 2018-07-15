<?php
include('../../users/config.php');
include('../../config/log_handler.php');

switch($_GET['action']) {
  case 'get_po_count' :
    get_po_count();
    break;
  case 'get_po_masters' :
      get_po_masters();
    break;
    case 'get_po_master' :
      get_po_master();
    break;
}

//get_estimate();
function get_po_count(){
  $data = json_decode(file_get_contents("php://input"));
  $CUSTOMERID = $data->CUSTOMERID;

  $qry_num = mysql_query("SELECT * FROM VIEW_PO_MASTER WHERE CUSTOMERID = '$CUSTOMERID'");

  $num_rows = mysql_num_rows($qry_num);
  
  $data  = array();
  $data[]->total = $num_rows;
  
  echo(json_encode($data));
  return json_encode($data);


}



function get_po_masters() {
    $data = json_decode(file_get_contents("php://input"));
    $CUSTOMERID   = $data->CUSTOMERID;
    $qry = "SELECT 
    PO.ID, 
    PO.POID,
    PO.MODIFIEDBY,
    PO.MODIFIEDDATE,
    PO.CREATEDBY,
    PO.CREATEDDATE,
    CUST.CUSTOMERID, 
    CUST.FULLNAME,
    CUST.TYPE 
    FROM VIEW_PO_MASTER PO, VIEW_CUSTOMER_MASTER CUST 
    WHERE PO.CUSTOMERID = CUST.CUSTOMERID AND PO.CUSTOMERID = '$CUSTOMERID' ORDER BY MODIFIEDBY DESC";
    
    //$qry = "select p.poid, sum(pb.AMOUNT) AS PAMOUNT from VIEW_PO_MASTER AS p left outer join VIEW_PO_BASKET AS pb on p.POID = pb.POID group by p.POID where p.POID='$POID'";
    $result = mysql_query($qry);
    if(!$result){
      $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please contact Administrator.');
      $jsn = json_encode($arr);
      trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
      trigger_error(mysql_error());
      print_r($jsn);
    }else{
      $data  = array();
      while($rows = mysql_fetch_array($result))
      {
        $data[] = array(
          "ID"                =>  $rows['ID'],
          "POID"              =>  $rows['POID'],
          "CUSTOMERID"        =>  $rows['CUSTOMERID'],
          "MODIFIEDBY"        =>  $rows['MODIFIEDBY'],
          "MODIFIEDDATE"      =>  $rows['MODIFIEDDATE'],
          "CREATEDBY"         =>  $rows['CREATEDBY'],
          "CREATEDDATE"       =>  $rows['CREATEDDATE'],
          "FULLNAME"          =>  $rows['FULLNAME'],
          "TYPE"              =>  $rows['TYPE']
        );
      }
      print_r(json_encode($data));
    }
  }


function get_po_master() {
  $data = json_decode(file_get_contents("php://input"));
  $POID   = $data->POID;
  $qry = "SELECT 
  PO.ID, 
  PO.POID,
  PO.MODIFIEDBY,
  PO.MODIFIEDDATE,
  PO.CREATEDBY,
  PO.CREATEDDATE,
  CUST.CUSTOMERID, 
  CUST.FULLNAME,
  CUST.TYPE 
  FROM VIEW_PO_MASTER PO, VIEW_CUSTOMER_MASTER CUST 
  WHERE PO.CUSTOMERID = CUST.CUSTOMERID AND PO.POID = '$POID' ORDER BY MODIFIEDBY DESC";
  
  $result = mysql_query($qry);
  if(!$result){
    $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please contact Administrator.');
    $jsn = json_encode($arr);
    trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
    trigger_error(mysql_error());
    print_r($jsn);
  }else{
    $data  = array();
    while($rows = mysql_fetch_array($result))
    {
      $data[] = array(
        "ID"                =>  $rows['ID'],
        "POID"              =>  $rows['POID'],
        "CUSTOMERID"        =>  $rows['CUSTOMERID'],
        "MODIFIEDBY"        =>  $rows['MODIFIEDBY'],
        "MODIFIEDDATE"      =>  $rows['MODIFIEDDATE'],
        "CREATEDBY"         =>  $rows['CREATEDBY'],
        "CREATEDDATE"       =>  $rows['CREATEDDATE'],
        "FULLNAME"          =>  $rows['FULLNAME'],
        "TYPE"              =>  $rows['TYPE']
      );
    }
    print_r(json_encode($data));
  }
}

?>