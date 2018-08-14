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
    case 'get_pqe' :
    get_pqe();
    break;
    case 'get_note':
    get_note();
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
function get_note() {

  $CUSTOMERID = $_GET['customerid'];
  
  $qry = "SELECT * FROM VIEW_CUSTOMER_NOTE WHERE CUSTOMERID = '$CUSTOMERID' ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysql_query($qry);
  $data = array();
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "ID"            =>  $rows['ID'],
      "CUSTOMERID"    =>  $rows['CUSTOMERID'],
      "TITLE"         =>  $rows['TITLE'],
      "NOTE"          =>  $rows['NOTE'],
      "CREATEDBY"     =>  $rows['CREATEDBY'],
      "CREATEDDATE"   =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE']
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
/*
SELECT LABOURID,WEEKID,CUSTOMERID, SUM(SHIFT) AS SHIFTSUM FROM (SELECT tbl_labourtms_basket.weekID, tbl_labourtms_master.CUSTOMERID, tbl_labourtms_basket.SHIFT, tbl_labourtms_master.LABOURID FROM tbl_labourtms_basket JOIN tbl_labourtms_master ON tbl_labourtms_master.WEEKID = tbl_labourtms_basket.WEEKID where tbl_labourtms_master.CUSTOMERID = tbl_labourtms_basket.CUSTOMERID and tbl_labourtms_master.LABOURID = tbl_labourtms_basket.LABOURID) AS T where weekid = 'WEEK1_AUG_2018' and labourid = 'L1' and customerid = 'AGM-R-BI-41620182010' GROUP BY CUSTOMERID
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

  // LABOUR TOTAL...
  $qry_labour_total = "SELECT SUM(SALARY) AS SALARYAMOUNT 
  FROM VIEW_LABOURTMS_MASTER WHERE CUSTOMERID = '$CUSTOMERID'";

  $qry_res_labour = mysql_query($qry_labour_total);
  
  $data_total_salaryamount = array();
  while($rows = mysql_fetch_array($qry_res_labour))
  {
    $data_total_salaryamount[]  = array(
      "SALARYAMOUNT"  => $rows['SALARYAMOUNT']
    );
  }

  // LABOUR TOTAL...
  $qry_mds_total = "SELECT COUNT(SHIFT) AS MANDAYS 
  FROM VIEW_LABOURTMS_BASKET WHERE CUSTOMERID = '$CUSTOMERID'";

  $qry_res_mds = mysql_query($qry_mds_total);
  
  $data_total_mds = array();
  while($rows = mysql_fetch_array($qry_res_mds))
  {
    $data_total_mds[]  = array(
      "MANDAYS"  => $rows['MANDAYS']
    );
  }

  $data[]->QUOTEAMOUNT      = $data_total_quoteamount;
  $data[]->PAIDAMOUNT       = $data_total_paidamount;
  $data[]->POAMOUNT         = $data_total_poamount;
  $data[]->SALARYAMOUNT     = $data_total_salaryamount;
  $data[]->MANDAYS          = $data_total_mds;


  echo(json_encode($data));
  return json_encode($data);
}

function get_pqe(){
  $data = json_decode(file_get_contents("php://input"));

  $CUSTOMERID = $data->CUSTOMERID;
  $data = array();

  $qry_po = "SELECT SUM(AMOUNT) AS AMOUNT, POID FROM
    (SELECT CUSTOMERID, AMOUNT,POID FROM 
    (SELECT VIEW_PO_BASKET.AMOUNT, VIEW_PO_MASTER.CUSTOMERID, VIEW_PO_MASTER.POID FROM
     VIEW_PO_BASKET JOIN VIEW_PO_MASTER ON VIEW_PO_MASTER.POID = VIEW_PO_BASKET.POID 
     WHERE VIEW_PO_MASTER.CUSTOMERID = '$CUSTOMERID') AS FIRSTT) AS SECONDT GROUP BY POID";
  
  $qry_res_po = mysql_query($qry_po);
  $data_po = array();
  while($rows = mysql_fetch_array($qry_res_po))
  {
    $data_po[]  = array(
      "AMOUNT"        =>  $rows['AMOUNT'],
      "POID"          =>  $rows['POID']
    );
  };

  $qry_q = "SELECT SUM(AMOUNT) AS AMOUNT, QUOTEID FROM
    (SELECT CUSTOMERID, AMOUNT,QUOTEID FROM 
    (SELECT VIEW_QUOTE_BASKET.AMOUNT, VIEW_QUOTE_MASTER.CUSTOMERID, VIEW_QUOTE_MASTER.QUOTEID FROM
     VIEW_QUOTE_BASKET JOIN VIEW_QUOTE_MASTER ON VIEW_QUOTE_MASTER.QUOTEID = VIEW_QUOTE_BASKET.QUOTEID 
     WHERE VIEW_QUOTE_MASTER.CUSTOMERID = '$CUSTOMERID') AS FIRSTT) AS SECONDT GROUP BY QUOTEID";
  
  $qry_res_q = mysql_query($qry_q);
  $data_q = array();
  while($rows = mysql_fetch_array($qry_res_q))
  {
    $data_q[]  = array(
      "AMOUNT"        =>  $rows['AMOUNT'],
      "QUOTEID"       =>  $rows['QUOTEID']
    );
  };

  $qry_est = "SELECT SUM(AMOUNT) AS AMOUNT, ESTIMATEID FROM
    (SELECT CUSTOMERID, AMOUNT,ESTIMATEID FROM 
    (SELECT VIEW_ESTIMATE_BASKET.AMOUNT, VIEW_ESTIMATE_MASTER.CUSTOMERID, VIEW_ESTIMATE_MASTER.ESTIMATEID FROM
     VIEW_ESTIMATE_BASKET JOIN VIEW_ESTIMATE_MASTER ON VIEW_ESTIMATE_MASTER.ESTIMATEID = VIEW_ESTIMATE_BASKET.ESTIMATEID 
     WHERE VIEW_ESTIMATE_MASTER.CUSTOMERID = '$CUSTOMERID') AS FIRSTT) AS SECONDT GROUP BY ESTIMATEID";
  
  $qry_res_est = mysql_query($qry_est);
  $data_est = array();
  while($rows = mysql_fetch_array($qry_res_est))
  {
    $data_est[]  = array(
      "AMOUNT"        =>  $rows['AMOUNT'],
      "ESTIMATEID"    =>  $rows['ESTIMATEID']
    );
  };


  $data[]->POITEM           = $data_po;
  $data[]->QITEM            = $data_q;
  $data[]->ESTITEM          = $data_est;

  echo(json_encode($data));
  return json_encode($data);
}

?>