<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  add_payment();


  /** Function to Push Product **/
  function add_payment() {

    $data = json_decode(file_get_contents("php://input"));

    $PAYFROM            =   $data->PAYFROM;
    $PAYTO              =   $data->PAYTO;
    $DATE               =   $data->DATE;
    $AMOUNT             =   $data->AMOUNT;
    $CUSTOMERID         =   $data->CUSTOMERID;
    $COMMENT            =   $data->COMMENT;
    $EXPITEM            =   $data->EXPITEM;
    $POTYPE             =   $data->POTYPE;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;

    $COMMENT = str_replace("'","''",$COMMENT);
    
    $qry = "INSERT INTO VIEW_PAYMENT  
    (PAYFROM, PAYTO, DATE, AMOUNT, CUSTOMERID, COMMENT, POTYPE, EXPITEM, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY) 
    VALUES ('$PAYFROM', '$PAYTO', '$DATE', '$AMOUNT', '$CUSTOMERID', '$COMMENT', '$POTYPE', '$EXPITEM', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";


     $result = mysql_query($qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'PAYMENT ADD: Unknown Exception occurred. Please check the application log for more details.');
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
