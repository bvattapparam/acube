<?php
include('../../users/config.php');
include('../../config/log_handler.php');

switch($_GET['action']) {
    case 'update_shift_pay' :
        update_shift_pay();
        break;
    case 'update_tms' :
        update_tms();
        break;
    case 'update_labour':
        update_labour();
        break;
  }

  /** Function to Push Product **/
  function update_shift_pay() {
    global $con;

    $data = json_decode(file_get_contents("php://input"));

    $ID                 =   $data->ID; 
    $PERSHIFT           =   $data->PERSHIFT;
    $SALARY             =   $data->SALARY;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");

    $qry = "UPDATE VIEW_LABOURTMS_MASTER 
    SET PERSHIFT = '$PERSHIFT', 
    SALARY = '$SALARY',  
    MODIFIEDBY = '$MODIFIEDBY', 
    MODIFIEDDATE = '$MODIFIEDDATE' 
    WHERE ID = '$ID'";

    $result = mysqli_query($con,$qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => $qry . " PAYMENT EDIT - Updated recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}

/** Function to Push Product **/
function update_labour() {
    global $con;

    $data = json_decode(file_get_contents("php://input"));

    $ID                 =   $data->ID; 
    $LABOUR             =   $data->LABOUR;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");

    $qry = "UPDATE VIEW_LABOUR  
    SET LABOUR = '$LABOUR', 
    MODIFIEDBY = '$MODIFIEDBY', 
    MODIFIEDDATE = '$MODIFIEDDATE'  
    WHERE ID = '$ID'";

    $result = mysqli_query($con,$qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => $qry . " PAYMENT EDIT - Updated recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}

  /** Function to Push Product **/
  function update_tms() {
    global $con;

    $data = file_get_contents('php://input');
    $cloneArray     =   json_decode($data, true);
    $CUSTOMERID     =   $cloneArray['CUSTOMERID'];
    $WEEKID         =   $cloneArray['WEEKID'];
    $LABOURID       =   $cloneArray['LABOURID'];
    $SALARY         =   $cloneArray['SALARY'];
    $MODIFIEDBY     =   $cloneArray['MODIFIEDBY'];
    
    foreach($cloneArray['TMS'] as $value){
        $ID         =   $value['ID'];
        $SHIFT      =   $value['SHIFT'];
        $qry_cln    =   "UPDATE VIEW_LABOURTMS_BASKET SET SHIFT = '$SHIFT', MODIFIEDBY = '$MODIFIEDBY' WHERE ID = '$ID'";
        $result_cln =   mysqli_query($con,$qry_cln);
    }
    
    $qry_master     =   "UPDATE VIEW_LABOURTMS_MASTER 
    SET SALARY = '$SALARY', MODIFIEDBY = '$MODIFIEDBY' 
    WHERE CUSTOMERID = '$CUSTOMERID' 
    AND WEEKID = '$WEEKID' AND LABOURID = '$LABOURID'";
    $result_master = mysqli_query($con,$qry_master);

    if(!$result_cln){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => $qry . " PAYMENT EDIT - Updated recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}
?>
