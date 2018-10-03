<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  
  
switch($_GET['action']) {
    
      case 'add_prefill' :
      add_prefill();
      break;
      default:
      push_user_data();
      break;
  }



  /** Function to Push Product **/
  function add_prefill() {
    global $con;
    $data = json_decode(file_get_contents("php://input"));
    $CONTENT = $data->CONTENT;
    $CREATEDBY = 'EST';

    $qry = "INSERT INTO VIEW_REF_PRECONTENT (CONTENT, CATEGORY) VALUES ('$CONTENT', '$CATEGORY')";


     $result = mysqli_query($con,$qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "ADDED recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}

  /** Function to Push Product **/
  function push_user_data() {
    global $con;
    $data = json_decode(file_get_contents("php://input"));
    $USERID = $data->USERID;
    $FULLNAME =$data->FULLNAME;
    $MOBILE = $data->MOBILE;
    $ROLE = implode(",", $data->ROLE);
    $AVATAR = $data->AVATAR;
    $MODIFIEDBY = $data->MODIFIEDBY;
    $MODIFIEDDATE = date("Y-m-d");
    $CREATEDDATE = date("Y-m-d");
    $CREATEDBY   =  $data->MODIFIEDBY;
    $PASSWORD = 'test';

    $qry = "INSERT INTO VIEW_AUTHENTICATION (USERID, FULLNAME, MOBILE, PASSWORD, ROLE, AVATAR, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY) VALUES ('$USERID', '$FULLNAME', '$MOBILE', '$PASSWORD', '$ROLE','$AVATAR', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";


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
