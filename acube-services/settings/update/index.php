<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  
switch($_GET['action']) {
    case 'update_location' :
        update_location();
      break;
    
  }


  /** Function to Push Product **/
  function update_location() {
    $data = json_decode(file_get_contents("php://input"));
    $NAME = $data->NAME;
    $CODE =$data->CODE;

    $qry = "UPDATE VIEW_REF_LOCATION SET NAME = '$NAME' WHERE CODE = '$CODE'";


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