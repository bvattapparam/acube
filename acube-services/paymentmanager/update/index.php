<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  edit_payment();

  /** Function to Push Product **/
  function edit_payment() {

    $data = json_decode(file_get_contents("php://input"));

    $ID                 =   $data->ID; 
    $PAYFROM            =   $data->PAYFROM;
    $PAYTO              =   $data->PAYTO;
    $DATE               =   $data->DATE;
    $AMOUNT             =   $data->AMOUNT;
    $POTYPE             =   $data->POTYPE;
    $EXPITEM            =   $data->EXPITEM;
    $CUSTOMERID         =   $data->CUSTOMERID;
    $COMMENT            =   $data->COMMENT;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");

    $COMMENT = str_replace("'","''",$COMMENT);


    $qry = "UPDATE VIEW_PAYMENT 
    SET PAYFROM = '$PAYFROM', 
    PAYTO = '$PAYTO', 
    DATE = '$DATE', 
    AMOUNT = '$AMOUNT',
    CUSTOMERID = '$CUSTOMERID', 
    COMMENT = '$COMMENT', 
    POTYPE = '$POTYPE', 
    EXPITEM = '$EXPITEM',  
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
        $arr = array('msg' => " PAYMENT EDIT - Updated recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}
?>
