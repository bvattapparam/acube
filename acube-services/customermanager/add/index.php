<?php
include('../../users/config.php');
include('../../config/log_handler.php');
  
switch($_GET['action']) {
    case 'add_customer_note' :
        add_customer_note();
    break;
    default:
        add_customer_data();
    break;
  }



  /** Function to Push Product **/
  function add_customer_data() {

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

    $COMMENT            =   str_replace("'","''",$COMMENT);
    
    $qry = "INSERT INTO VIEW_CUSTOMER_MASTER (CUSTOMERID, TYPE, FULLNAME, MOBILE, EMAIL, ADDRESS, COMMENT, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY, STATUS) VALUES ('$CUSTOMERID', '$TYPE', '$FULLNAME', '$MOBILE', '$EMAIL', '$ADDRESS','$COMMENT', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY', '$STATUS')";


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
  function add_customer_note() {

    $data = json_decode(file_get_contents("php://input"));

    $CUSTOMERID         =   $data->CUSTOMERID;
    $TITLE              =   $data->TITLE;
    $NOTE               =   $data->NOTE;

    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;

    $NOTE            =   str_replace("'","''",$NOTE);
    
    $qry = "INSERT INTO VIEW_CUSTOMER_NOTE (CUSTOMERID, TITLE, NOTE, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY)
     VALUES ('$CUSTOMERID', '$TITLE', '$NOTE', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";


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
