<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  push_customer_data();


  /** Function to Push Product **/
  function push_customer_data() {

    $data = json_decode(file_get_contents("php://input"));

    $CUSTOMERID         =   $data->CUSTOMERID;
    $TYPE               =   $data->TYPE;
    $FULLNAME           =   $data->FULLNAME;
    $MOBILE             =   $data->MOBILE;
    $EMAIL              =   $data->EMAIL;
    $ADDRESS            =   $data->ADDRESS;
    $COMMENT            =   $data->COMMENT;
    $STATUS             =   $data->STATUS;

    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;
    
    $qry = "INSERT INTO VIEW_CUSTOMER_MASTER (CUSTOMERID, TYPE, FULLNAME, MOBILE, EMAIL, ADDRESS, COMMENT, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY, STATUS) VALUES ('$CUSTOMERID', '$TYPE', '$FULLNAME', '$MOBILE', '$EMAIL', '$ADDRESS','$COMMENT', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY', 'STATUS')";


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
