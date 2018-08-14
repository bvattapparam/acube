<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

switch($_GET['action']) {
  case 'get_opexp_basket' :
  get_opexp_basket();
    break;
}



function get_opexp_basket() {
  
    $data = json_decode(file_get_contents("php://input"));
    $OPEXPID = $data->OPEXPID;
    $qry = "SELECT * FROM VIEW_OPEXP_BASKET WHERE OPEXPID = '$OPEXPID'";
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
          "OPEXPID"         =>  $rows['OPEXPID'],
          "DESCRIPTION"     =>  $rows['DESCRIPTION'],
          "VENDORID"        =>  $rows['VENDORID'],
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