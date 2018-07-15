<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

  add_estimate_basket();


  /** Function to Push Product **/
  function add_estimate_basket() {

    $data = json_decode(file_get_contents("php://input"));

    $ESTIMATEID         =   $data->ESTIMATEID;
    $DESCRIPTION        =   $data->DESCRIPTION;
    $LOCATION           =   $data->LOCATION;
    $QTY                =   $data->QTY;
    $UNIT               =   $data->UNIT;
    $PERCOST            =   $data->PERCOST;
    $AMOUNT             =   $data->AMOUNT;

    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;
    
    $qry = "INSERT INTO VIEW_ESTIMATE_BASKET (ESTIMATEID, DESCRIPTION, LOCATION, QTY, UNIT, PERCOST, AMOUNT, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY) VALUES ('$ESTIMATEID', '$DESCRIPTION', '$LOCATION', '$QTY', '$UNIT', '$PERCOST', '$AMOUNT', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";


     $result = mysql_query($qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysql_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Updated recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}
?>
