<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

  add_po_basket();


  /** Function to Push Product **/
  function add_po_basket() {
    global $con;

    $data = json_decode(file_get_contents("php://input"));

    $POID         =   $data->POID;
    $VENDORID           =   $data->VENDORID;
    $DESCRIPTION        =   $data->DESCRIPTION;
    $UNIT               =   $data->UNIT;
    $QTY                =   $data->QTY;
    $PERCOST            =   $data->PERCOST;
    $AMOUNT             =   $data->AMOUNT;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;
    
    $qry = "INSERT INTO VIEW_PO_BASKET (POID, VENDORID, DESCRIPTION, QTY, UNIT, PERCOST, AMOUNT, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY) VALUES ('$POID', '$VENDORID', '$DESCRIPTION', '$QTY', '$UNIT', '$PERCOST', '$AMOUNT', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";


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
