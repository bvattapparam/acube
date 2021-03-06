<?php
include('../../users/config.php');
include('../../config/log_handler.php');

switch($_GET['action']) {
  case 'get_quote_count' :
  get_quote_count();
    break;
  case 'get_quote_master' :
  get_quote_master();
    break;
  case 'get_quotes' :
  get_quotes();
    break;
  
}

function get_quote_count(){

  $data = json_decode(file_get_contents("php://input"));
  
  $CUSTOMERID = $data->CUSTOMERID;

  $qry_num = mysql_query("SELECT * FROM VIEW_QUOTE_MASTER WHERE CUSTOMERID = '$CUSTOMERID'");

  $num_rows = mysql_num_rows($qry_num);
  
  $data  = array();
  $data[]->total = $num_rows;
  
  echo(json_encode($data));
  return json_encode($data);


}


/** Function to Get Product **/
function get_quotes() {

  $data = json_decode(file_get_contents("php://input"));
  $CUSTOMERID = $data->CUSTOMERID;
  
  $qry = "SELECT 
  QUT.ID,
  QUT.QUOTEID,
  QUT.CUSTOMERID,
  QUT.CREATEDBY,
  QUT.CREATEDDATE,
  QUT.MODIFIEDBY,
  QUT.MODIFIEDDATE,
  QUT.STATUS,
  QUT.APPROVED,
  CUST.CUSTOMERID,
  CUST.QUOTEAPPROVED   
  FROM VIEW_QUOTE_MASTER QUT, VIEW_CUSTOMER_MASTER CUST 
  WHERE QUT.CUSTOMERID = '$CUSTOMERID' AND QUT.CUSTOMERID = CUST.CUSTOMERID 
  ORDER BY MODIFIEDDATE DESC";
  

  $result = mysql_query($qry);
  if(!$result){
    $arr = array('msg' => "", 'error' => 'Unknown Exception occurred.');
    $jsn = json_encode($arr);
    trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
    trigger_error(mysql_error());
    print_r($jsn);
  }else{
    $data  = array();
    while($rows = mysql_fetch_array($result))
    {
      $data[] = array(
        "ID"              =>  $rows['ID'],
        "QUOTEID"         =>  $rows['QUOTEID'],
        "CUSTOMERID"      =>  $rows['CUSTOMERID'],
        "CREATEDBY"       =>  $rows['CREATEDBY'],
        "CREATEDDATE"     =>  $rows['CREATEDDATE'],
        "MODIFIEDBY"      =>  $rows['MODIFIEDBY'],
        "MODIFIEDDATE"    =>  $rows['MODIFIEDDATE'],
        "STATUS"          =>  $rows['STATUS'],
        "APPROVED"        =>  $rows['APPROVED'],
        "QUOTEAPPROVED"   =>  $rows['QUOTEAPPROVED']
      );
    }
    
    print_r(json_encode($data));
  }
}


function get_quote_master() {
    $data = json_decode(file_get_contents("php://input"));
    $QUOTEID = $data->QUOTEID;
    $qry = "SELECT 
    QST.ID, 
    QST.QUOTEID,
    QST.STATUS,
    QST.APPROVED,
    QST.MODIFIEDBY,
    QST.MODIFIEDDATE,
    QST.CREATEDBY,
    QST.CREATEDDATE,
    CUST.CUSTOMERID, 
    CUST.FULLNAME,
    CUST.TYPE,
    CUST.QUOTEAPPROVED   
    FROM VIEW_QUOTE_MASTER QST, VIEW_CUSTOMER_MASTER CUST 
    WHERE QST.QUOTEID = '$QUOTEID' AND QST.CUSTOMERID = CUST.CUSTOMERID";
    
    $result = mysql_query($qry);
    if(!$result){
      $arr = array('msg' => "", 'error' => 'Unknown Exception occurred.');
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
          "QUOTEID"           =>  $rows['QUOTEID'],
          "STATUS"            =>  $rows['STATUS'],
          "APPROVED"          =>  $rows['APPROVED'],
          "MODIFIEDBY"        =>  $rows['MODIFIEDBY'],
          "MODIFIEDDATE"      =>  $rows['MODIFIEDDATE'],
          "CREATEDBY"         =>  $rows['CREATEDBY'],
          "CREATEDDATE"       =>  $rows['CREATEDDATE'],
          "CUSTOMERID"        =>  $rows['CUSTOMERID'],
          "FULLNAME"          =>  $rows['FULLNAME'],
          "TYPE"              =>  $rows['TYPE'],
          "QUOTEAPPROVED"     =>  $rows['QUOTEAPPROVED']
        );
      }
      
      print_r(json_encode($data));
    }
  }

?>