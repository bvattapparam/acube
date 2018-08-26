<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  put_user_data();


  /** Function to Push Product **/
  function put_user_data() {
    global $con;
    $data = json_decode(file_get_contents("php://input"));
    $USERID = $data->USERID;
    $FULLNAME =$data->FULLNAME;
    $PASSWORD = $data->PASSWORD;
    $MOBILE = $data->MOBILE;
    $ROLE = implode(",", $data->PERMISSIONS);
    $AVATAR = $data->AVATAR;
    $MODIFIEDBY = $data->USERID;
    $MODIFIEDDATE = date("Y-m-d");

    $qry = "UPDATE VIEW_AUTHENTICATION SET FULLNAME = '$FULLNAME', PASSWORD = '$PASSWORD', MOBILE = '$MOBILE', AVATAR = '$AVATAR', ROLE = '$ROLE', MODIFIEDBY = '$MODIFIEDBY', MODIFIEDDATE = '$MODIFIEDDATE' WHERE USERID = '$USERID'";


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
