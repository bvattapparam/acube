<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  switch($_GET['action']) {
    case 'approve_quote_master' :
        approve_quote_master();
        break;
}
  
   

function approve_quote_master(){
    
$data = json_decode(file_get_contents("php://input"));

  $QUOTEID              =   $data->QUOTEID;
  $MODIFIEDBY           =   $data->MODIFIEDBY;
  $MODIFIEDDATE         =   date("Y-m-d");
  $STATUS               =   1;
  $APPROVED             =   1;

  
  $qry_clone = "UPDATE VIEW_QUOTE_MASTER SET APPROVED = '$APPROVED', STATUS = '$STATUS', MODIFIEDBY = '$MODIFIEDBY', MODIFIEDDATE = '$MODIFIEDDATE' WHERE QUOTEID = '$QUOTEID'";  
  $result_clone = mysql_query($qry_clone);
  if(!$result_clone){
      $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
      $jsn = json_encode($arr);
      trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
      trigger_error(mysql_error());
      print_r($jsn);
  }else{
      $arr = array('msg' => "Updated Estimate master status Successfully!!!", 'error' => '');
      $jsn = json_encode($arr);
      print_r($jsn);
  }
}
    


?>
