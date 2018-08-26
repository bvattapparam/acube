<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

  delete_opexp_basket();


  /** Function to Push Product **/
  function delete_opexp_basket() {
    global $con;

    $data = json_decode(file_get_contents("php://input"));
    $ID         =   $data->ID;
    $qry = "DELETE FROM VIEW_OPEXP_BASKET WHERE ID = $ID";


     $result = mysqli_query($con,$qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysqli_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Deleted recored Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}
?>
