<?php
include('../../users/config.php');
include('../../config/log_handler.php');


switch($_GET['action']) {
    case 'update_estimate_status' :
        update_estimate_status();
    break;
    case 'update_customer_note' :
      update_customer_note();
    break;
    default:
        put_customer_data();
    break;
  }

/** Function to Push Product **/
function update_estimate_status() {

    $data = json_decode(file_get_contents("php://input"));

    $CUSTOMERID = $data->CUSTOMERID;
    
    $qry_clone = "UPDATE VIEW_CUSTOMER_MASTER SET ESTIMATESTATUS = 1 WHERE CUSTOMERID = '$CUSTOMERID'";  
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
/** Function to Push Product **/
function update_customer_note() {

    $data = json_decode(file_get_contents("php://input"));

    $ID         =   $data->ID;
    $CUSTOMERID         =   $data->CUSTOMERID;
    $TITLE              =   $data->TITLE;
    $NOTE               =   $data->NOTE;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");

    $NOTE            =   str_replace("'","''",$NOTE);


    $qry = "UPDATE VIEW_CUSTOMER_NOTE 
    SET TITLE = '$TITLE', 
    NOTE = '$NOTE', 
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

  /** Function to Push Product **/
  function put_customer_data() {

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

    $COMMENT            =   str_replace("'","''",$COMMENT);


    $qry = "UPDATE VIEW_CUSTOMER_MASTER SET TYPE = '$TYPE', FULLNAME = '$FULLNAME', MOBILE = '$MOBILE', EMAIL = '$EMAIL', ADDRESS = '$ADDRESS', COMMENT = '$COMMENT', MODIFIEDBY = '$MODIFIEDBY', MODIFIEDDATE = '$MODIFIEDDATE', STATUS = '$STATUS' WHERE CUSTOMERID = '$CUSTOMERID'";

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
