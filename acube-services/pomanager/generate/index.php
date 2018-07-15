<?php
include('../../users/config.php');
include('../../config/log_handler.php');


switch($_GET['action']) {
    case 'clone_estimate_master' :
        clone_estimate_master();
        break;
    case 'clone_update_estimate_master' :
        clone_update_estimate_master();
        break;
    case 'clone_estimate_basket' :
        clone_estimate_basket();
        break;
    case 'generate_po_master':
        generate_po_master();
        break;
}
  
   
  /** Function to Push Product **/
  function generate_po_master() {

    $data = json_decode(file_get_contents("php://input"));
    $POID               =   $data->POID;
    $CUSTOMERID         =   $data->CUSTOMERID;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;
    
    
    $qry = "INSERT INTO VIEW_PO_MASTER (POID, CUSTOMERID, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY) VALUES ('$POID', '$CUSTOMERID', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";
    $result = mysql_query($qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysql_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Generated PO Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}


  /** Function to Push Product **/
  function clone_estimate_master() {

    $data = json_decode(file_get_contents("php://input"));

    $CUSTOMERID         =   $data->CUSTOMERID;
    $ESTIMATEID         =   $data->ESTIMATEID;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;
    $STATUS = 0;
    
    
    $qry = "INSERT INTO VIEW_ESTIMATE_MASTER (CUSTOMERID, ESTIMATEID, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY, STATUS) VALUES ('$CUSTOMERID', '$ESTIMATEID', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY', '$STATUS')";
    $result = mysql_query($qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysql_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Cloned estimate master Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}

/** Function to Push Product **/
  function clone_update_estimate_master() {

    $data = json_decode(file_get_contents("php://input"));

    $CLNESTIMATEID = $data->CLNESTIMATEID;
    
    $qry_clone = "UPDATE VIEW_ESTIMATE_MASTER SET STATUS = 1 WHERE ESTIMATEID = '$CLNESTIMATEID'";  
    $result_clone = mysql_query($qry_clone);
    if(!$result_clone){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysql_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Updated Estimate master status Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }

}


/** Function to Push Product **/
function clone_estimate_basket() {
    $data = file_get_contents('php://input');
    $cloneArray = json_decode($data, true);

    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $ESTIMATEID         =   $cloneArray['ESTIMATEID'];
    $MODIFIEDBY         =   $cloneArray['MODIFIEDBY'];
    $CREATEDBY          =   $cloneArray['MODIFIEDBY'];

  
  foreach($cloneArray['CLONEBASKET'] as $value){
    $DESCRIPTION = $value['DESCRIPTION'];
    $LOCATION   =   $value['LOCATION'];
    $QTY   =   $value['QTY'];
    $UNIT   =   $value['UNIT'];
    $PERCOST   =   $value['PERCOST'];
    $AMOUNT   =   $value['AMOUNT'];

    $qry_cln = "INSERT INTO VIEW_ESTIMATE_BASKET (ESTIMATEID, DESCRIPTION, LOCATION, QTY, UNIT, PERCOST, AMOUNT, CREATEDBY, CREATEDDATE, MODIFIEDBY, MODIFIEDDATE) VALUES ('$ESTIMATEID', '$DESCRIPTION', '$LOCATION', '$QTY', '$UNIT', '$PERCOST', '$AMOUNT', '$CREATEDBY','$CREATEDDATE','$MODIFIEDBY','$MODIFIEDDATE')";
   
    $result_cln = mysql_query($qry_cln);
  }
    if(!$result_cln){
        $arr = array('msg' => "", 'error' => 'Clone Estimate Basket - Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysql_error());
        print_r($jsn);
    }else{
        $arr = array('msg' => "Cloned estimate basket Successfully!!!", 'error' => '');
        $jsn = json_encode($arr);
        print_r($jsn);
    }
}


?>