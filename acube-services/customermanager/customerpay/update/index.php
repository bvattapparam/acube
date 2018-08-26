<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

update_customerpay();

  //put_customer_data();


  /** Function to Push Product **/
  function update_customerpay() {
    global $con;

    $data = json_decode(file_get_contents("php://input"));

    $ID                 =   $data->ID;
    $CUSTOMERID         =   $data->CUSTOMERID;
    $DATE               =   $data->DATE;
    $PURPOSE            =   $data->PURPOSE;
    $AMOUNT             =   $data->AMOUNT;
    $MODE               =   $data->MODE;
    $REFNUMBER          =   $data->REFNUMBER;
    $COMMENT            =   $data->COMMENT;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");

    $COMMENT            =   str_replace("'","''",$COMMENT);


    $qry = "UPDATE VIEW_CUSTOMER_PAY SET CUSTOMERID = '$CUSTOMERID', 
    DATE = '$DATE', 
    PURPOSE = '$PURPOSE', 
    AMOUNT = '$AMOUNT', 
    MODE = '$MODE', 
    REFNUMBER = '$REFNUMBER', 
    COMMENT = '$COMMENT', 
    MODIFIEDBY = '$MODIFIEDBY', 
    MODIFIEDDATE = '$MODIFIEDDATE' 
    WHERE ID = '$ID'";

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
