<?php
include('../../users/config.php');
include('../../config/log_handler.php');

update_marketingbasket_data();


  /** Function to Push Product **/
  function update_marketingbasket_data() {
    $data = json_decode(file_get_contents("php://input"));
    $ID = $data->ID;
    $NAME =$data->NAME;
    $MOBILE = $data->MOBILE;
    $STATUS = $data->STATUS;
    $MODIFIEDBY = $data->MODIFIEDBY;
    $MODIFIEDDATE = date("Y-m-d");
    $COMMENT = $data->COMMENT;

    $qry = "UPDATE VIEW_MARKETINGBASKET SET NAME = '$NAME', MOBILE = '$MOBILE', STATUS = '$STATUS', MODIFIEDBY = '$MODIFIEDBY', MODIFIEDDATE = '$MODIFIEDDATE', COMMENT = '$COMMENT' WHERE ID = '$ID'";


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
