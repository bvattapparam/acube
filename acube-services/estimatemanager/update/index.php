<?php
include('../../users/config.php');
include('../../config/log_handler.php');


switch($_GET['action']) {
    case 'update_estimate_discount':
    update_estimate_discount();
        break;
}
  
   
  /** Function to Push Product **/
  function update_estimate_discount() {
    global $con;
    $data = json_decode(file_get_contents("php://input"));

    $ESTIMATEID         =   $data->ESTIMATEID;
    $DISCOUNT           =   $data->DISCOUNT;
    
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");

    $qry = "UPDATE VIEW_ESTIMATE_MASTER ";
    if($DISCOUNT == 1){
        $qry = $qry . "SET DISCOUNT = NULL";
    }else{
        $qry = $qry . "SET DISCOUNT = '$DISCOUNT'";
    }
    $qry = $qry . " WHERE ESTIMATEID = '$ESTIMATEID'";
    
    $result = mysqli_query($con,$qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => $qry);
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Generated estimate Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}
?>