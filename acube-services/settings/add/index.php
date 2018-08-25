<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  push_user_data();


  /** Function to Push Product **/
  function push_user_data() {
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
