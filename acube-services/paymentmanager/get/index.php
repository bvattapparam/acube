<?php
include('../../users/config.php');
include('../../config/log_handler.php');
switch($_GET['action']) {
  case 'get_payment' :
    get_payment();
    break;
  case 'get_paymentbyuser':
    get_paymentbyuser();
    break;
  case 'get_cashdetails' :
    get_cashdetails();
    break;
}

/** Function to Get Product **/
function get_payment() {
  global $con;
  $data         =   json_decode(file_get_contents("php://input"));
  $limit        =   $data->limit;
  $offset       =   $data->offset;
  $pagenation   =   $data->pagenation;

  if($pagenation){
    $qry_count = mysqli_query($con,"SELECT * FROM VIEW_PAYMENT");
    $num_rows = mysqli_num_rows($qry_count);
  
    $qry = "SELECT * FROM VIEW_PAYMENT ORDER BY MODIFIEDDATE DESC LIMIT $limit OFFSET $offset";
    $qry_res = mysqli_query($con,$qry);
  } else {
    $qry_count = mysqli_query($con,"SELECT * FROM VIEW_PAYMENT");
    $num_rows = mysqli_num_rows($qry_count);

    $qry = "SELECT * FROM VIEW_PAYMENT ORDER BY MODIFIEDDATE DESC";
    $qry_res = mysqli_query($con,$qry);
  }
  
  $data = array();
    
  while($rows = mysqli_fetch_array($qry_res))
  {
    $data_item[] = array(
      "ID"            =>  $rows['ID'],
      "PAYFROM"       =>  $rows['PAYFROM'],
      "PAYTO"         =>  $rows['PAYTO'],
      "DATE"          =>  $rows['DATE'],
      "AMOUNT"        =>  $rows['AMOUNT'],
      "CUSTOMERID"    =>  $rows['CUSTOMERID'],
      "POTYPE"        =>  $rows['POTYPE'],
      "EXPITEM"       =>  $rows['EXPITEM'],
      "COMMENT"       =>  $rows['COMMENT'],
      "STATUS"        =>  $rows['STATUS'],
      "CREATEDBY"     =>  $rows['CREATEDBY'],
      "CREATEDDATE"   =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE']
    );
  }

  $qry_pr_total = "SELECT SUM(AMOUNT) AS PRAMOUNT FROM VIEW_PAYMENT WHERE POTYPE = 'PREXP'";
  $qry_res_pr = mysqli_query($con,$qry_pr_total);
  
  $data_total_pramount = array();
  while($rows = mysqli_fetch_array($qry_res_pr))
  {
    $data_total_pramount[]  = array(
      "PRAMOUNT"  => $rows['PRAMOUNT']
    );
  }
  $qry_opexp_total = "SELECT SUM(AMOUNT) AS OPEXPAMOUNT FROM VIEW_PAYMENT WHERE POTYPE = 'OPEXP'";
  $qry_res_opexp = mysqli_query($con,$qry_opexp_total);
  
  $data_total_opexpamount = array();
  while($rows = mysqli_fetch_array($qry_res_opexp))
  {
    $data_total_opexpamount[]  = array(
      "OPEXPAMOUNT"  => $rows['OPEXPAMOUNT']
    );
  }


  $data_total=array("TOTAL"=> $num_rows);
  $data[]->ITEM = $data_item;
  $data[]->TOTAL = $data_total;
  $data[]->PRTOTALAMOUNT      = $data_total_pramount;
  $data[]->OPEXPTOTALAMOUNT   = $data_total_opexpamount;

  echo(json_encode($data));
  return json_encode($data);
}

/** Function to Get Product **/
function get_paymentbyuser() {
  global $con;
  $data = json_decode(file_get_contents("php://input"));
  $USERID = $data->USERID;
  $limit = $data->limit;
  $offset = $data->offset;
  
  $qry_count = mysqli_query($con,"SELECT * FROM VIEW_PAYMENT WHERE PAYTO = '$USERID' ORDER BY MODIFIEDDATE DESC");
  $num_rows = mysqli_num_rows($qry_count);


  $qry = "SELECT * FROM VIEW_PAYMENT WHERE PAYTO = '$USERID' ORDER BY MODIFIEDDATE DESC LIMIT $limit OFFSET $offset";
  $qry_res = mysqli_query($con,$qry);

  $data = array();
    
  while($rows = mysqli_fetch_array($qry_res))
  {
    $data_item[] = array(
      "ID"            =>  $rows['ID'],
      "PAYFROM"       =>  $rows['PAYFROM'],
      "PAYTO"         =>  $rows['PAYTO'],
      "DATE"          =>  $rows['DATE'],
      "AMOUNT"        =>  $rows['AMOUNT'],
      "CUSTOMERID"    =>  $rows['CUSTOMERID'],
      "POTYPE"        =>  $rows['POTYPE'],
      "EXPITEM"       =>  $rows['EXPITEM'],
      "COMMENT"       =>  $rows['COMMENT'],
      "STATUS"        =>  $rows['STATUS'],
      "CREATEDBY"     =>  $rows['CREATEDBY'],
      "CREATEDDATE"   =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE']
    );
  }


  $qry_po_total = "SELECT SUM(AMOUNT) AS POAMOUNT FROM VIEW_PO_BASKET WHERE CREATEDBY = '$USERID'";
  $qry_res_po = mysqli_query($con,$qry_po_total);
  
  $data_total_poamount = array();
  while($rows = mysqli_fetch_array($qry_res_po))
  {
    $data_total_poamount[]  = array(
      "POAMOUNT"  => $rows['POAMOUNT']
    );
  }

  $qry_opexp_total = "SELECT SUM(AMOUNT) AS OPEXPAMOUNT FROM VIEW_OPEXP_BASKET WHERE CREATEDBY = '$USERID'";
  $qry_res_opexp = mysqli_query($con,$qry_opexp_total);
  
  $data_total_opexpamount = array();
  while($rows = mysqli_fetch_array($qry_res_opexp))
  {
    $data_total_opexpamount[]  = array(
      "OPEXPAMOUNT"  => $rows['OPEXPAMOUNT']
    );
  }

  $data_total=array("TOTAL"=> $num_rows);

  $data[]->ITEM               = $data_item;
  $data[]->TOTAL              = $data_total;
  $data[]->POTOTALAMOUNT      = $data_total_poamount;
  $data[]->OPEXPTOTALAMOUNT   = $data_total_opexpamount;

echo(json_encode($data));
return json_encode($data);
}

/** Function to Get Product **/
function get_cashdetails() {
  global $con;
  $data = json_decode(file_get_contents("php://input"));

  $USERID            =   $data->USERID;
  $qry = "SELECT * FROM VIEW_PAYMENT WHERE PAYTO = '$USERID' ORDER BY MODIFIEDDATE DESC";
  
  $qry_res = mysqli_query($con,$qry);

  

  
  if(!$qry_res){
    $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
    $jsn = json_encode($arr);
    trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
    trigger_error(mysqli_error());
    print_r($jsn);
  }else{
    $data = array();  
    while($rows = mysqli_fetch_array($qry_res))
    {
      $data[] = array(
        "ID"            =>  $rows['ID'],
        "PAYFROM"       =>  $rows['PAYFROM'],
        "PAYTO"         =>  $rows['PAYTO'],
        "DATE"          =>  $rows['DATE'],
        "AMOUNT"        =>  $rows['AMOUNT'],
        "CUSTOMERID"    =>  $rows['CUSTOMERID'],
        "POTYPE"        =>  $rows['POTYPE'],
        "EXPITEM"       =>  $rows['EXPITEM'],
        "POTYPE"        =>  $rows['POTYPE'],
        "EXPITEM"       =>  $rows['EXPITEM'],
        "COMMENT"       =>  $rows['COMMENT'],
        "STATUS"        =>  $rows['STATUS'],
        "CREATEDBY"     =>  $rows['CREATEDBY'],
        "CREATEDDATE"   =>  $rows['CREATEDDATE'],
        "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
        "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE']
      );
    }
    echo(json_encode($data));
    return json_encode($data);
  }
}

/** Function to Get Product **/
function get_vendors() {
  global $con;
  $data = json_decode(file_get_contents("php://input"));

  $qry = "SELECT * FROM VIEW_VENDOR_MASTER ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysqli_query($qry);
  $data = array();
    
  while($rows = mysqli_fetch_array($qry_res))
  {
    $data[] = array(
      "ID"                =>  $rows['ID'],
      "VENDORID"          =>  $rows['VENDORID'],
      "NAME"              =>  $rows['NAME'],
      "MOBILE"            =>  $rows['MOBILE'],
      "EMAIL"             =>  $rows['EMAIL'],
      "CONTACTPERSON"     =>  $rows['CONTACTPERSON'],
      "ADDRESS"           =>  $rows['ADDRESS'],
      "COMMENT"           =>  $rows['COMMENT'],
      "STATUS"            =>  $rows['STATUS'],
      "CREATEDBY"         =>  $rows['CREATEDBY'],
      "CREATEDDATE"       =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"        =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"      =>  $rows['MODIFIEDDATE']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

?>