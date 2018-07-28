<?php
include('../../users/config.php');
include('../../config/log_handler.php');
switch($_GET['action']) {
  case 'get_customer' :
    get_customer();
    break;
  case 'get_customers' :
    get_customer_data();
    break;
  case 'get_status_count' :
    get_status_count();
    break;
  case 'get_totals' :
        get_totals();
    break;
}

/** Function to Get Product **/
function get_customer() {
  $data = json_decode(file_get_contents("php://input"));

  $CUSTOMERID = $_GET['customerid'];
  
  $qry = "SELECT * FROM VIEW_CUSTOMER_MASTER WHERE CUSTOMERID = '$CUSTOMERID' ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysql_query($qry);
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
  {
    $data = array(
      "ID"            =>  $rows['ID'],
      "CUSTOMERID"    =>  $rows['CUSTOMERID'],
      "TYPE"          =>  $rows['TYPE'],
      "FULLNAME"      =>  $rows['FULLNAME'],
      "MOBILE"        =>  $rows['MOBILE'],
      "EMAIL"         =>  $rows['EMAIL'],
      "ADDRESS"       =>  $rows['ADDRESS'],
      "COMMENT"       =>  $rows['COMMENT'],
      "STATUS"        =>  $rows['STATUS'],
      "CREATEDBY"     =>  $rows['CREATEDBY'],
      "CREATEDDATE"   =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE'],
      "ESTIMATESTATUS"  =>  $rows['ESTIMATESTATUS'],
      "QUOTEAPPROVED"  =>  $rows['QUOTEAPPROVED']
    );
  }
  
echo(json_encode($data));
return json_encode($data);
}

/** Function to Get Product **/
function get_customer_data() {
  $data = json_decode(file_get_contents("php://input"));
  $limit              =   $data->limit;
  $offset             =   $data->offset;
  $statusfilters      =   $data->statusfilters;
  $filterstatus       =   $data->filterstatus;
  $pagenation         =   $data->pagenation;
  
  if($pagenation){
    if($filterstatus){
      $qry_count = mysql_query("SELECT * FROM VIEW_CUSTOMER_MASTER WHERE STATUS IN (".implode(',',$statusfilters).")");
      $num_rows = mysql_num_rows($qry_count);
  
      $qry = "SELECT * FROM VIEW_CUSTOMER_MASTER WHERE STATUS IN (".implode(',',$statusfilters).") ORDER BY MODIFIEDDATE DESC LIMIT $limit OFFSET $offset";
      $qry_res = mysql_query($qry);
    } else {
      $qry_count = mysql_query("SELECT * FROM VIEW_CUSTOMER_MASTER");
      $num_rows = mysql_num_rows($qry_count);
  
      $qry = "SELECT * FROM VIEW_CUSTOMER_MASTER ORDER BY MODIFIEDDATE DESC LIMIT $limit OFFSET $offset";
      $qry_res = mysql_query($qry);
    }
  }else{
    if($filterstatus){
      $qry_count = mysql_query("SELECT * FROM VIEW_CUSTOMER_MASTER WHERE STATUS IN (".implode(',',$statusfilters).")");
      $num_rows = mysql_num_rows($qry_count);
  
      $qry = "SELECT * FROM VIEW_CUSTOMER_MASTER WHERE STATUS IN (".implode(',',$statusfilters).") ORDER BY MODIFIEDDATE DESC";
      $qry_res = mysql_query($qry);
    } else {
      $qry_count = mysql_query("SELECT * FROM VIEW_CUSTOMER_MASTER");
      $num_rows = mysql_num_rows($qry_count);
  
      $qry = "SELECT * FROM VIEW_CUSTOMER_MASTER ORDER BY MODIFIEDDATE DESC";
      $qry_res = mysql_query($qry);
    }
  } 

  $data = array();
  while($rows = mysql_fetch_array($qry_res))
  {
    $data_item[] = array(
      "ID"            =>  $rows['ID'],
      "CUSTOMERID"    =>  $rows['CUSTOMERID'],
      "TYPE"          =>  $rows['TYPE'],
      "FULLNAME"      =>  $rows['FULLNAME'],
      "MOBILE"        =>  $rows['MOBILE'],
      "EMAIL"         =>  $rows['EMAIL'],
      "ADDRESS"       =>  $rows['ADDRESS'],
      "COMMENT"       =>  $rows['COMMENT'],
      "STATUS"        =>  $rows['STATUS'],
      "CREATEDBY"     =>  $rows['CREATEDBY'],
      "CREATEDDATE"   =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE'],
      "ESTIMATESTATUS"  =>  $rows['ESTIMATESTATUS'],
      "QUOTEAPPROVED"  =>  $rows['QUOTEAPPROVED']
    );
  }
  $data_total=array("TOTAL"=> $num_rows);
  $data[]->ITEM = $data_item;
  $data[]->TOTAL = $data_total;
echo (json_encode($data));
return json_encode($data);
}

function get_status_count() {

  $data = json_decode(file_get_contents("php://input"));

  $qry = "SELECT STATUS, COUNT(*) AS ST FROM VIEW_CUSTOMER_MASTER GROUP BY STATUS ORDER BY COUNT(*) DESC";

  $qry_res = mysql_query($qry);
  $data = array();

  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "STATUS"  => $rows['STATUS'],
      "VALUE" =>  (int) $rows['ST']
    );
  }

  echo(json_encode($data));
  return json_encode($data);
}

function get_totals(){
  $data = json_decode(file_get_contents("php://input"));

  $CUSTOMERID = $data->CUSTOMERID;
/*
  $qry = "SELECT SUM(AMOUNT) AS POAMOUNT FROM VIEW_QUOTE_MASTER WHERE CUSTOMERID = '$CUSTOMERID'";

  $qry_res = mysql_query($qry);
  $data = array();

  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "POAMOUNT"  => $rows['POAMOUNT']
    );
  }
  */
/*
SELECT CUSTOMERID, SUM(AMOUNT) 
FROM (SELECT tbl_quote_basket.QUOTEID, 
tbl_quote_master.CUSTOMERID, 
tbl_quote_basket.AMOUNT FROM tbl_quote_basket 
JOIN tbl_quote_master 
ON tbl_quote_master.QUOTEID = tbl_quote_basket.QUOTEID 
WHERE tbl_quote_master.CUSTOMERID='AGM-R-SUM-7720182211') AS T 
GROUP BY CUSTOMERID
*/
/*
SELECT CUSTOMERID, SUM(AMOUNT) 
FROM (SELECT tbl_quote_basket.QUOTEID, 
tbl_quote_master.CUSTOMERID, 
tbl_quote_basket.AMOUNT FROM tbl_quote_basket 
JOIN tbl_quote_master 
ON tbl_quote_master.QUOTEID = tbl_quote_basket.QUOTEID 
WHERE tbl_quote_master.CUSTOMERID='AGM-R-BI-41620182010' AND tbl_quote_master.APPROVED =1) AS T 
GROUP BY CUSTOMERID
*/
/*
SELECT CUSTOMERID, SUM(AMOUNT) AS POAMOUNT 
FROM (SELECT tbl_PO_basket.POID, 
tbl_PO_master.CUSTOMERID, 
tbl_PO_basket.AMOUNT FROM tbl_PO_basket 
JOIN tbl_PO_master 
ON tbl_PO_master.POID = tbl_PO_basket.POID 
WHERE tbl_PO_master.CUSTOMERID='AGM-R-BI-41620182010') AS T 
GROUP BY CUSTOMERID
*/
  $data = array();

  //  QUOTE TOTAL..
  $qry_quote_total = "SELECT CUSTOMERID, SUM(AMOUNT) AS QUOTEAMOUNT 
  FROM (SELECT tbl_quote_basket.QUOTEID, 
  tbl_quote_master.CUSTOMERID, 
  tbl_quote_basket.AMOUNT FROM tbl_quote_basket 
  JOIN tbl_quote_master 
  ON tbl_quote_master.QUOTEID = tbl_quote_basket.QUOTEID 
  WHERE tbl_quote_master.CUSTOMERID = '$CUSTOMERID' AND tbl_quote_master.APPROVED = 1) AS T 
  GROUP BY CUSTOMERID";
  $qry_res_quote = mysql_query($qry_quote_total);
  
  $data_total_quoteamount = array();
  while($rows = mysql_fetch_array($qry_res_quote))
  {
    $data_total_quoteamount[]  = array(
      "QUOTEAMOUNT"  => $rows['QUOTEAMOUNT']
    );
  }
  
  // PO TOTAL...
  $qry_po_total = "SELECT CUSTOMERID, SUM(AMOUNT) AS POAMOUNT 
  FROM (SELECT tbl_PO_basket.POID, 
  tbl_PO_master.CUSTOMERID, 
  tbl_PO_basket.AMOUNT FROM tbl_PO_basket 
  JOIN tbl_PO_master 
  ON tbl_PO_master.POID = tbl_PO_basket.POID 
  WHERE tbl_PO_master.CUSTOMERID='$CUSTOMERID') AS T 
  GROUP BY CUSTOMERID";
  $qry_res_po = mysql_query($qry_po_total);
  
  $data_total_poamount = array();
  while($rows = mysql_fetch_array($qry_res_po))
  {
    $data_total_poamount[]  = array(
      "POAMOUNT"  => $rows['POAMOUNT']
    );
  }

  // PAID SO FAR - CUSTOMER PAY...

  // PO TOTAL...
  $qry_paid_total = "SELECT SUM(AMOUNT) AS PAIDAMOUNT 
  FROM VIEW_CUSTOMER_PAY WHERE CUSTOMERID = '$CUSTOMERID'";

  $qry_res_paid = mysql_query($qry_paid_total);
  
  $data_total_paidamount = array();
  while($rows = mysql_fetch_array($qry_res_paid))
  {
    $data_total_paidamount[]  = array(
      "PAIDAMOUNT"  => $rows['PAIDAMOUNT']
    );
  }


  $data[]->QUOTEAMOUNT      = $data_total_quoteamount;
  $data[]->PAIDAMOUNT       = $data_total_paidamount;
  $data[]->POAMOUNT         = $data_total_poamount;


  echo(json_encode($data));
  return json_encode($data);
}

?>