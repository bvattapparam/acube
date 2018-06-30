<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

  put_editestimate_basket_data();


  /** Function to Push Product **/
  function put_editestimate_basket_data() {

    $data = json_decode(file_get_contents("php://input"));

    $ID                 =   $data->ID;
    $DESCRIPTION        =   $data->DESCRIPTION;
    $LOCATION           =   $data->LOCATION;
    $QTY                =   $data->QTY;
    $UNIT               =   $data->UNIT;
    $PERCOST            =   $data->PERCOST;
    $AMOUNT             =   $data->AMOUNT;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");


    $qry = "UPDATE VIEW_ESTIMATE_BASKET 
    SET DESCRIPTION = '$DESCRIPTION', 
    LOCATION = '$LOCATION', 
    QTY = '$QTY', 
    UNIT = '$UNIT', 
    PERCOST = '$PERCOST', 
    AMOUNT = '$AMOUNT', 
    MODIFIEDBY = '$MODIFIEDBY', 
    MODIFIEDDATE = '$MODIFIEDDATE' 
    WHERE ID = '$ID'";

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
