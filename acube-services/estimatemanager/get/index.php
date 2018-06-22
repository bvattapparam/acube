<?php
include('../../users/config.php');
include('../../config/log_handler.php');

switch($_GET['action']) {
  case 'get_estimate_count' :
    get_estimate_count();
    break;
  case 'get_estimate_master' :
    get_estimate_master();
    break;
  case 'get_estimates' :
    get_estimates();
    break;
  
}

get_estimate();
function get_estimate_count(){
  $data = json_decode(file_get_contents("php://input"));
  $CUSTOMERID = $data->CUSTOMERID;

  $qry_num = mysql_query("SELECT * FROM VIEW_ESTIMATE_MASTER WHERE CUSTOMERID = '$CUSTOMERID'");

  $num_rows = mysql_num_rows($qry_num);
  
  $data  = array();
  $data[]->total = $num_rows;
  
  echo(json_encode($data));
  return json_encode($data);


}


/** Function to Get Product **/
function get_estimates() {

  $data = json_decode(file_get_contents("php://input"));
  $CUSTOMERID = $data->CUSTOMERID;
  
  $qry = "SELECT * FROM VIEW_ESTIMATE_MASTER WHERE CUSTOMERID = '$CUSTOMERID' ORDER BY MODIFIEDDATE DESC";
  

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
        "ID"            =>  $rows['ID'],
        "ESTIMATEID"    =>  $rows['ESTIMATEID'],
        "CUSTOMERID"    =>  $rows['CUSTOMERID'],
        "CREATEDBY"     =>  $rows['CREATEDBY'],
        "CREATEDDATE"   =>  $rows['CREATEDDATE'],
        "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
        "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE']
      );
    }
    
    print_r(json_encode($data));
  }
}


function get_estimate_master() {
  
    $data = json_decode(file_get_contents("php://input"));
    $ESTIMATEID = $data->ESTIMATEID;
    $qry = "SELECT 
    EST.ID, 
    EST.ESTIMATEID,
    EST.MODIFIEDBY,
    EST.MODIFIEDDATE,
    EST.CREATEDBY,
    EST.CREATEDDATE,
    CUST.CUSTOMERID, 
    CUST.FULLNAME,
    CUST.TYPE
    FROM VIEW_ESTIMATE_MASTER EST, VIEW_CUSTOMER_MASTER CUST 
    WHERE EST.ESTIMATEID = '$ESTIMATEID' AND EST.CUSTOMERID = CUST.CUSTOMERID";
    
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
          "ID"            =>  $rows['ID'],
          "ESTIMATEID"    =>  $rows['ESTIMATEID'],
          "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
          "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE'],
          "CREATEDBY"     =>  $rows['CREATEDBY'],
          "CREATEDDATE"   =>  $rows['CREATEDDATE'],
          "CUSTOMERID"    =>  $rows['CUSTOMERID'],
          "FULLNAME"      =>  $rows['FULLNAME'],
          "TYPE"          =>  $rows['TYPE']
        );
      }
      
      print_r(json_encode($data));
    }
  }

?>