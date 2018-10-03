<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  
switch($_GET['action']) {
    case 'update_location' :
        update_location();
      break;
      case 'update_prefill' :
      update_prefill();
      break;
      case 'estimate_sort_order' :
        estimate_sort_order();
      break;
      case 'quote_sort_order' :
        quote_sort_order();
      break;
  }


  /** Function to Push Product **/
  function update_location() {
    global $con;
    $data = json_decode(file_get_contents("php://input"));
    $NAME = $data->NAME;
    $CODE =$data->CODE;

    $qry = "UPDATE VIEW_REF_LOCATION SET NAME = '$NAME' WHERE CODE = '$CODE'";

     $result = mysqli_query($con,$qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Updated recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}



  /** Function to Push Product **/
  function update_prefill() {
    global $con;
    $data = json_decode(file_get_contents("php://input"));
    $CONTENT    = $data->CONTENT;
    $ID         = $data->ID;

    $qry = "UPDATE VIEW_REF_PRECONTENT SET CONTENT = '$CONTENT' WHERE ID = '$ID'";

     $result = mysqli_query($con,$qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Updated recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}


/** Function to Push Product **/
function estimate_sort_order() {
    global $con;
    $data = json_decode(file_get_contents("php://input"));
    $ESTIMATEID = $data->ESTIMATEID;
    $SORTORDER =$data->SORTORDER;

    $qry = "UPDATE VIEW_ESTIMATE_MASTER SET SORTORDER = '$SORTORDER' WHERE ESTIMATEID = '$ESTIMATEID'";


     $result = mysqli_query($con,$qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Updated recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}


/** Function to Push Product **/
function quote_sort_order() {
    global $con;
    $data = json_decode(file_get_contents("php://input"));
    $QUOTEID = $data->QUOTEID;
    $SORTORDER =$data->SORTORDER;

    $qry = "UPDATE VIEW_QUOTE_MASTER SET SORTORDER = '$SORTORDER' WHERE QUOTEID = '$QUOTEID'";


     $result = mysqli_query($con,$qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Updated recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}
?>
