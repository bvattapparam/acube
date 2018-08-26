<?php
include('../../users/config.php');
include('../../config/log_handler.php');


switch($_GET['action']) {
    case 'update_vendor' :
    update_vendor();
      break;
  }

  //put_customer_data();


  /** Function to Push Product **/
  function update_vendor() {
    global $con;

    $data = json_decode(file_get_contents("php://input"));

    $VENDORID           =   $data->VENDORID;
    $NAME               =   $data->NAME;
    $MOBILE             =   $data->MOBILE;
    $EMAIL              =   $data->EMAIL;
    $CONTACTPERSON      =   $data->CONTACTPERSON;
    $ADDRESS            =   $data->ADDRESS;
    $COMMENT            =   $data->COMMENT;
    $STATUS             =   $data->STATUS;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");


    $qry = "UPDATE VIEW_VENDOR_MASTER 
    SET NAME = '$NAME', 
    MOBILE = '$MOBILE', 
    EMAIL = '$EMAIL', 
    CONTACTPERSON = '$CONTACTPERSON', 
    ADDRESS = '$ADDRESS', 
    COMMENT = '$COMMENT', 
    MODIFIEDBY = '$MODIFIEDBY', 
    MODIFIEDDATE = '$MODIFIEDDATE', 
    STATUS = '$STATUS' 
    WHERE VENDORID = '$VENDORID'";

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
