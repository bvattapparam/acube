<?php
include('../../users/config.php');
include('../../config/log_handler.php');

switch($_GET['action']) {
  case 'get_opexp_count' :
    get_opexp_count();
    break;
  case 'get_opexp_masters' :
      get_opexp_masters();
    break;
    case 'get_opexp_master' :
      get_opexp_master();
    break;
}

//get_estimate();
function get_opexp_count(){
  $data = json_decode(file_get_contents("php://input"));

  $qry_num = mysql_query("SELECT * FROM VIEW_OPEXP_MASTER");

  $num_rows = mysql_num_rows($qry_num);
  
  $data  = array();
  $data[]->total = $num_rows;
  
  echo(json_encode($data));
  return json_encode($data);


}



function get_opexp_masters() {
    $data = json_decode(file_get_contents("php://input"));
    $qry = "SELECT 
    OPEXP.ID, 
    OPEXP.OPEXPID,
    OPEXP.MODIFIEDBY,
    OPEXP.MODIFIEDDATE,
    OPEXP.CREATEDBY,
    OPEXP.CREATEDDATE,
    OPEXP.STATUS 
    FROM VIEW_OPEXP_MASTER OPEXP ORDER BY OPEXP.MODIFIEDDATE DESC";
    
    //$qry = "select p.poid, sum(pb.AMOUNT) AS PAMOUNT from VIEW_PO_MASTER AS p left outer join VIEW_PO_BASKET AS pb on p.POID = pb.POID group by p.POID where p.POID='$POID'";
    $result = mysql_query($qry);
    if(!$result){
      $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please contact Administrator.');
      $jsn = json_encode($arr);
      trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
      trigger_error(mysql_error());
      print_r($jsn);
    }else{
      $data  = array();
      while($rows = mysql_fetch_array($result))
      {
        $data[] = array(
          "ID"                =>  $rows['ID'],
          "OPEXPID"           =>  $rows['OPEXPID'],
          "MODIFIEDBY"        =>  $rows['MODIFIEDBY'],
          "MODIFIEDDATE"      =>  $rows['MODIFIEDDATE'],
          "CREATEDBY"         =>  $rows['CREATEDBY'],
          "CREATEDDATE"       =>  $rows['CREATEDDATE'],
          "STATUS"            =>  $rows['STATUS']
        );
      }
      print_r(json_encode($data));
    }
  }


function get_opexp_master() {
  $data = json_decode(file_get_contents("php://input"));
  $OPEXPID   = $data->OPEXPID;
  $qry = "SELECT * FROM VIEW_OPEXP_MASTER 
  WHERE OPEXPID = '$OPEXPID' ORDER BY MODIFIEDBY DESC";
  
  $result = mysql_query($qry);
  if(!$result){
    $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please contact Administrator.');
    $jsn = json_encode($arr);
    trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
    trigger_error(mysql_error());
    print_r($jsn);
  }else{
    $data  = array();
    while($rows = mysql_fetch_array($result))
    {
      $data[] = array(
        "ID"                =>  $rows['ID'],
        "OPEXPID"           =>  $rows['OPEXPID'],
        "MODIFIEDBY"        =>  $rows['MODIFIEDBY'],
        "MODIFIEDDATE"      =>  $rows['MODIFIEDDATE'],
        "CREATEDBY"         =>  $rows['CREATEDBY'],
        "CREATEDDATE"       =>  $rows['CREATEDDATE'],
        "STATUS"            =>  $rows['STATUS']
      );
    }
    print_r(json_encode($data));
  }
}

?>