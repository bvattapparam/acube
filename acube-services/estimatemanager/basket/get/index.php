<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

switch($_GET['action']) {
  case 'get_estimate_basket' :
    get_estimate_basket();
    break;
}



function get_estimate_basket() {
  global $con;
    $data = json_decode(file_get_contents("php://input"));
    $ESTIMATEID = $data->ESTIMATEID;
    $qry = "SELECT * FROM VIEW_ESTIMATE_BASKET WHERE ESTIMATEID = '$ESTIMATEID' ORDER BY LOCATION ASC";
    
    $result = mysqli_query($con,$qry);
    if(!$result){
      $arr = array('msg' => "", 'error' => 'Unknown Exception occurred.');
      $jsn = json_encode($arr);
      trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
      trigger_error(mysqli_error());
      print_r($jsn);
    }else{
      $data  = array();
      while($rows = mysqli_fetch_array($result))
      {
        $data[] = array(
          "ID"              =>  $rows['ID'],
          "ESTIMATEID"      =>  $rows['ESTIMATEID'],
          "DESCRIPTION"     =>  $rows['DESCRIPTION'],
          "LOCATION"        =>  $rows['LOCATION'],
          "QTY"             =>  $rows['QTY'],
          "UNIT"            =>  $rows['UNIT'],
          "PERCOST"         =>  $rows['PERCOST'],
          "AMOUNT"          =>  $rows['AMOUNT'],        
          "MODIFIEDBY"      =>  $rows['MODIFIEDBY'],
          "MODIFIEDDATE"    =>  $rows['MODIFIEDDATE'],
          "CREATEDBY"       =>  $rows['CREATEDBY'],
          "CREATEDDATE"     =>  $rows['CREATEDDATE']
        );
      }
      
      print_r(json_encode($data));
    }
  }

?>