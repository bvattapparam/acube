<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  add_vendor();


  /** Function to Push Product **/
  function add_vendor() {
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
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;
    
    $qry = "INSERT INTO VIEW_VENDOR_MASTER 
    (VENDORID, NAME, MOBILE, EMAIL, CONTACTPERSON, ADDRESS, COMMENT, STATUS, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY) 
    VALUES ('$VENDORID', '$NAME', '$MOBILE', '$EMAIL', '$CONTACTPERSON', '$ADDRESS','$COMMENT', '$STATUS', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";


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
