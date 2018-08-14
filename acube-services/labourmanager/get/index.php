<?php
include('../../users/config.php');
include('../../config/log_handler.php');
switch($_GET['action']) {
  case 'get_labours' :
    get_labours();
    break;
  case 'get_labourtms_full':
    get_labourtms_full();
    break;
  case 'get_shift_edit_data' :
    get_shift_edit_data();
    break;
}

/** Function to Get Product **/
function get_labours() {
  $data         =   json_decode(file_get_contents("php://input"));

  $qry = "SELECT * FROM VIEW_LABOUR ORDER BY ID ASC";
  $qry_res = mysql_query($qry);
  
  
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "ID"            =>  $rows['ID'],
      "LABOURID"      =>  $rows['LABOURID'],
      "LABOUR"        =>  $rows['LABOUR'],
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

/** Function to Get Product **/
function get_labourtms_full() {
  $data = json_decode(file_get_contents("php://input"));
  
  $CUSTOMERID   = $data->CUSTOMERID;

  //$qry = "SELECT * FROM VIEW_LABOURTMS_BASKET WHERE CUSTOMERID = '$CUSTOMERID' ORDER BY WEEKID";
  $qry ="SELECT 
  LB.ID,
  LB.WEEKID,
  LB.CUSTOMERID,
  LB.LABOURID,
  LB.WORKDATE,
  LB.SHIFT,
  LB.CREATEDBY,
  LB.CREATEDDATE,
  LB.MODIFIEDBY,
  LB.MODIFIEDDATE,
  LM.PERSHIFT,
  LM.SALARY FROM VIEW_LABOURTMS_BASKET LB, VIEW_LABOURTMS_MASTER LM
   WHERE LB.CUSTOMERID = '$CUSTOMERID' AND LB.WEEKID = LM.WEEKID AND LB.CUSTOMERID = LM.CUSTOMERID AND
   LB.LABOURID = LM.LABOURID ORDER BY LB.WEEKID, LB.LABOURID, LB.WORKDATE";
  $qry_res = mysql_query($qry);

  
  $data = array();
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "ID"            =>  $rows['ID'],
      "WEEKID"        =>  $rows['WEEKID'],
      "CUSTOMERID"    =>  $rows['CUSTOMERID'],
      "LABOURID"      =>  $rows['LABOURID'],
      "WORKDATE"      =>  $rows['WORKDATE'],
      "SHIFT"         =>  $rows['SHIFT'],
      "PERSHIFT"      =>  $rows['PERSHIFT'],
      "SALARY"        =>  $rows['SALARY'],
      "CREATEDBY"     =>  $rows['CREATEDBY'],
      "CREATEDDATE"   =>  $rows['CREATEDDATE'],
      "MODIFIEDBY"    =>  $rows['MODIFIEDBY'],
      "MODIFIEDDATE"  =>  $rows['MODIFIEDDATE']
    );
  }

  $result = $data;
  $locations = array();

  foreach($result as $res){
    $locations[$res['WEEKID']][$res['LABOURID']][] = array('WORKDATE' => $res['WORKDATE'], 'SHIFT' => $res['SHIFT'], 'PERSHIFT' => $res['PERSHIFT'],'SALARY' => $res['SALARY'],'ID' => $res['ID']);//$res['WORKDATE'];
  }
  $datas = array();
  foreach($locations as $location=>$sans){
    $location_array = array('WEEK'=>$location);
    foreach($sans as $san=>$labours){
      $san_array = array('LABOUR'=>$san);
      $san_array['PERSHIFT'] = $sans[$san][0]['PERSHIFT'];
      $san_array['SALARY'] = $sans[$san][0]['SALARY'];
      foreach($labours as $labour){;
        $san_array['TMS'][] = $labour;
      }
      $location_array['TMSENTRIES'][]=$san_array;
    };
    $datas[]=$location_array;
  }
  echo(json_encode($datas));
}

/** Function to Get Product **/
function get_shift_edit_data() {
  $data = json_decode(file_get_contents("php://input"));

  $CUSTOMERID             =   $data->CUSTOMERID;
  $LABOURID               =   $data->LABOURID;
  $WEEKID                 =   $data->WEEKID;

  $qry = "SELECT ID, PERSHIFT, SALARY, LABOURID, WEEKID, CUSTOMERID, SUM(SHIFT) AS SHIFT, CREATEDBY, CREATEDDATE, MODIFIEDBY, MODIFIEDDATE 
  FROM (SELECT VM.ID,
        VB.WEEKID, 
        VM.CUSTOMERID, 
        VB.SHIFT, 
        VM.LABOURID,
        VM.SALARY,
        VM.PERSHIFT ,
        VM.CREATEDBY,
        VM.CREATEDDATE,
        VM.MODIFIEDBY,
        VM.MODIFIEDDATE  
        FROM VIEW_LABOURTMS_BASKET VB 
        JOIN VIEW_LABOURTMS_MASTER VM 
        ON VM.WEEKID = VB.WEEKID 
        WHERE VM.CUSTOMERID = VB.CUSTOMERID 
        AND VM.LABOURID = VB.LABOURID) AS T 
        WHERE WEEKID = '$WEEKID' and LABOURID = '$LABOURID' and CUSTOMERID = '$CUSTOMERID' GROUP BY CUSTOMERID";
  $qry_res = mysql_query($qry);
  
  if(!$qry_res){
    $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
    $jsn = json_encode($arr);
    trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
    trigger_error(mysql_error());
    print_r($jsn);
  }else{
    $data = array();  
    while($rows = mysql_fetch_array($qry_res))
    {
      $data[] = array(
        "ID"            =>  $rows['ID'],
        "SHIFT"         =>  $rows['SHIFT'],
        "PERSHIFT"      =>  $rows['PERSHIFT'],
        "SALARY"        =>  $rows['SALARY'],
        "WEEKID"        =>  $rows['WEEKID'],
        "CUSTOMERID"    =>  $rows['CUSTOMERID'],
        "LABOURID"      =>  $rows['LABOURID'],
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
  $data = json_decode(file_get_contents("php://input"));

  $qry = "SELECT * FROM VIEW_VENDOR_MASTER ORDER BY MODIFIEDDATE DESC";
  $qry_res = mysql_query($qry);
  $data = array();
    
  while($rows = mysql_fetch_array($qry_res))
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