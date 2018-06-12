<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  generate_estimate();


  /** Function to Push Product **/
  function generate_estimate() {

    $data = json_decode(file_get_contents("php://input"));

    $CUSTOMERID         =   $data->CUSTOMERID;
    $ESTIMATEID         =   $data->ESTIMATEID;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;
    
    $qry = "INSERT INTO VIEW_ESTIMATE_MASTER (CUSTOMERID, ESTIMATEID, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY) VALUES ('$CUSTOMERID', '$ESTIMATEID', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";


     $result = mysql_query($qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysql_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Generated estimate Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}
?>
