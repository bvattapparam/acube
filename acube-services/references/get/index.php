<?php
include('../../users/config.php');
include('../../config/log_handler.php');

header("Access-Control-Allow-Origin: http://localhost:4200");
get_reference_data();

  /** Main function to get the reference static data from reference tables **/
 function get_reference_data() {

$QRY_GENERICSTATUS        =   "SELECT * FROM VIEW_REF_GENERICSTATUS";
$QRY_PAYMENTMODE          =   "SELECT * FROM VIEW_REF_PAYMENTMODE";
$QRY_JURISDICTION         =   "SELECT * FROM VIEW_REF_JURISDICTION";
$QRY_AVATAR               =   "SELECT * FROM VIEW_REF_AVATAR";
$QRY_CUSTOMERTYPE         =   "SELECT * FROM VIEW_REF_CUSTOMER_TYPE";
$QRY_LOCATION             =   "SELECT * FROM VIEW_REF_LOCATION";

	
$RESULT_GENERICSTATUS               =		mysql_query($QRY_GENERICSTATUS); 
$RESULT_PAYMENTMODE                 =   mysql_query($QRY_PAYMENTMODE); 
$RESULT_JURISDICTION                =   mysql_query($QRY_JURISDICTION); 
$RESULT_AVATAR                      =   mysql_query($QRY_AVATAR); 
$RESULT_CUSTOMERTYPE                =   mysql_query($QRY_CUSTOMERTYPE); 
$RESULT_LOCATION                    =   mysql_query($QRY_LOCATION); 

$DATA  = array();
  // Generic Status reference data
  while($ROWS_GENERICSTATUS	=	mysql_fetch_array($RESULT_GENERICSTATUS)){
    $DATA_GENERICSTATUS[]	=	array(
      "id"          	=>  $ROWS_GENERICSTATUS['ID'],
      "code"   		    =>  $ROWS_GENERICSTATUS['CODE'],
      "name"      	  =>  $ROWS_GENERICSTATUS['NAME'],
      "status"    	  =>  $ROWS_GENERICSTATUS['STATUS']
      );
  };

  // payment mode reference data
  while($ROW_PAYMENTMODE = mysql_fetch_array($RESULT_PAYMENTMODE)){
    $DATA_PAYMENTMODE[]  = array(
      "id"            =>  $ROW_PAYMENTMODE['ID'],
      "code"          =>  $ROW_PAYMENTMODE['CODE'],
      "name"          =>  $ROW_PAYMENTMODE['NAME'],
      "status"        =>  $ROW_PAYMENTMODE['STATUS']
      );
  };
   // payment mode reference data
  while($ROW_JURISDICTION = mysql_fetch_array($RESULT_JURISDICTION)){
    $DATA_JURISDICTION[]  = array(
      "id"            =>  $ROW_JURISDICTION['ID'],
      "code"          =>  $ROW_JURISDICTION['CODE'],
      "name"          =>  $ROW_JURISDICTION['NAME'],
      "status"        =>  $ROW_JURISDICTION['STATUS']
      );
  };
   // avatar reference data
  while($ROW_AVATAR = mysql_fetch_array($RESULT_AVATAR)){
    $DATA_AVATAR[]  = array(
      "id"            =>  $ROW_AVATAR['ID'],
      "code"          =>  $ROW_AVATAR['CODE'],
      "name"          =>  $ROW_AVATAR['NAME'],
      "status"        =>  $ROW_AVATAR['STATUS']
      );
  };

  // CUSTOMER TYPE

   while($ROW_CUSTOMERTYPE = mysql_fetch_array($RESULT_CUSTOMERTYPE)){
    $DATA_CUSTOMERTYPE[]  = array(
      "id"            =>  $ROW_CUSTOMERTYPE['ID'],
      "code"          =>  $ROW_CUSTOMERTYPE['CODE'],
      "name"          =>  $ROW_CUSTOMERTYPE['NAME'],
      "status"        =>  $ROW_CUSTOMERTYPE['STATUS']
      );
  };

  while($ROW_LOCATION = mysql_fetch_array($RESULT_LOCATION)){
    $DATA_LOCATION[]  = array(
      "id"            =>  $ROW_LOCATION['ID'],
      "code"          =>  $ROW_LOCATION['CODE'],
      "name"          =>  $ROW_LOCATION['NAME'],
      "status"        =>  $ROW_LOCATION['STATUS']
      );
  };

  //echo json_encode($data_travelstatus);

  $DATA["GENERICSTATUS"]         =	  $DATA_GENERICSTATUS;
  $DATA["PAYMENTMODE"]           =    $DATA_PAYMENTMODE;
  $DATA["JURISDICTION"]          =    $DATA_JURISDICTION;
  $DATA["AVATAR"]                =    $DATA_AVATAR;
  $DATA["CUSTOMERTYPE"]          =    $DATA_CUSTOMERTYPE;
  $DATA["LOCATION"]              =    $DATA_LOCATION;

  echo json_encode($DATA);

}
?>
