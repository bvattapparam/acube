<?php
include('../../users/config.php');
include('../../config/log_handler.php');

switch($_GET['action']) {
    case 'add_shift' :
        add_shift();
        break;
  }


  /** Function to Push Product **/
  function add_shift() {
    global $con;
    //$data = json_decode(file_get_contents("php://input"));
    $data = file_get_contents('php://input');
    $cloneArray = json_decode($data, true);
    

    $CUSTOMERID         =   $cloneArray['CUSTOMERID'];
    $WEEKID             =   $cloneArray['WEEKID'];
    $LABOURID           =   $cloneArray['LABOURID'];
    $SHIFTS             =   $cloneArray['SHIFTS'];
    $MODIFIEDBY         =   $cloneArray['MODIFIEDBY'];
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $cloneArray['MODIFIEDBY'];

    // VALIDATE THE LABOUR IS ADDED ALREADY FOR THE SAME WEEK FOR THE SAME CUSTOMER....

    $qry_num = mysqli_query($con,"SELECT * FROM VIEW_LABOURTMS_BASKET WHERE CUSTOMERID = '$CUSTOMERID' AND WEEKID = '$WEEKID' AND LABOURID = '$LABOURID'");
    $num_rows = mysqli_num_rows($qry_num);

    if($num_rows > 0){
        $arr = array('msg' => "", 'error' => 'Entry is already there', 'errorid' => 'SHIFT001');
        $jsn = json_encode($arr);
        print_r($jsn);
    }else{
        foreach($cloneArray['SHIFTS'] as $value){
            $WORKDATE   =   $value['WORKDATE'];
            $SHIFT     =   $value['SHIFT'];
            $qry_cln = "INSERT INTO VIEW_LABOURTMS_BASKET (WEEKID, CUSTOMERID, LABOURID, WORKDATE, SHIFT, CREATEDBY, CREATEDDATE, MODIFIEDBY, MODIFIEDDATE) VALUES ('$WEEKID', '$CUSTOMERID', '$LABOURID', '$WORKDATE', '$SHIFT', '$CREATEDBY','$CREATEDDATE','$MODIFIEDBY','$MODIFIEDDATE')";
            $result_cln = mysqli_query($con,$qry_cln);
        }
         
        if(!$result_cln){
            $arr = array('msg' => "", 'error' => 'TIME SHEET - Unknown Exception occurred. Please check the application log for more details.');
            $jsn = json_encode($arr);
            trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
            trigger_error(mysqli_error());
            print_r($jsn);
        }else{
            $arr = array('msg' => "TIME SHEET Successfully!!!", 'error' => '');
            $jsn = json_encode($arr);
            print_r($jsn);
        }
        $PERSHIFT       =   0;
        $SALARY         =   0;
        $qry_master = "INSERT INTO VIEW_LABOURTMS_MASTER (WEEKID,  CUSTOMERID, LABOURID, PERSHIFT, SALARY, CREATEDBY, CREATEDDATE, MODIFIEDBY, MODIFIEDDATE) 
        VALUES ('$WEEKID', '$CUSTOMERID', '$LABOURID', '$PERSHIFT', '$SALARY', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDBY', '$MODIFIEDDATE')";
        
        $result_master = mysqli_query($con,$qry_master);
    }
}
?>
