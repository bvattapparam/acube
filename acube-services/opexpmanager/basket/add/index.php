<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

  add_opexp_basket();


  /** Function to Push Product **/
  function add_opexp_basket() {

    $data = json_decode(file_get_contents("php://input"));

    $OPEXPID            =   $data->OPEXPID;
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
    
    $qry = "INSERT INTO VIEW_OPEXP_BASKET (OPEXPID, VENDORID, DESCRIPTION, QTY, UNIT, PERCOST, AMOUNT, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY) VALUES ('$OPEXPID', '$VENDORID', '$DESCRIPTION', '$QTY', '$UNIT', '$PERCOST', '$AMOUNT', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";


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
