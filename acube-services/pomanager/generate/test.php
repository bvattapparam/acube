<?php
include('../../users/config.php');
include('../../config/log_handler.php');


switch($_GET['action']) {
    case 'get_estimate_count' :
      get_estimate_count();
      break;
    case 'get_estimate_master' :
      get_estimate_master();
      break;
    case 'get_estimates' :
      get_estimates();
      break;
    case 'generate_estimate':
        generate_estimate();
        break;

  
      

  


  /** Function to Push Product **/
  function generate_estimate() {

    $data = json_decode(file_get_contents("php://input"));

    $CUSTOMERID         =   $data->CUSTOMERID;
    $ESTIMATEID         =   $data->ESTIMATEID;
    $MODIFIEDBY         =   $data->MODIFIEDBY;
    $MODIFIEDDATE       =   date("Y-m-d");
    $CREATEDDATE        =   date("Y-m-d");
    $CREATEDBY          =   $data->MODIFIEDBY;
    $CLONE              =   $data->CLONE;

    
    
    
    
    $qry = "INSERT INTO VIEW_ESTIMATE_MASTER (CUSTOMERID, ESTIMATEID, CREATEDBY, CREATEDDATE, MODIFIEDDATE, MODIFIEDBY) VALUES ('$CUSTOMERID', '$ESTIMATEID', '$CREATEDBY', '$CREATEDDATE', '$MODIFIEDDATE', '$MODIFIEDBY')";
    $result = mysql_query($qry);
    if(!$result){
        $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
        $jsn = json_encode($arr);
        trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
        trigger_error(mysql_error());
        print_r($jsn);
    }else{
       // $arr = array('msg' => "Generated estimate Successfully!!!", 'error' => '');
       // $jsn = json_encode($arr);
       // print_r($jsn);
        
        if($CLONE){
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
                $CLNBASKET = $data->CLNBASKET;
                
                $obj = $CLNBASKET;
                


                    foreach($CLNBASKET as $item){
                        //echo $item['cart_item_id'];
                        $DESCRIPTION = $item['DESCRIPTION'];
                        $LOCATION   =   $item['LOCATION'];
                        $QTY   =   $item['QTY'];
                        $UNIT   =   $item['UNIT'];
                        $PERCOST   =   $item['PERCOST'];
                        $AMOUNT   =   $item['AMOUNT'];

                        $qry_cln = "INSERT INTO VIEW_ESTIMATE_BASKET (ESTIMATEID, DESCRIPTION, LOCATION, QTY, UNIT, PERCOST, AMOUNT, CREATEDBY, CREATEDDATE, MODIFIEDBY, MODIFIEDDATE) 
                    VALUES ('$ESTIMATEID', '$DESCRIPTION', '$LOCATION', '$QTY', '$UNIT', '$PERCOST', '$AMOUNT', '$CREATEDBY','$CREATEDDATE','$MODIFIEDBY','$MODIFIEDDATE')";
                    $result_cln = mysql_query($qry_cln);
                    
                    print "sss";
                      }

               
                    
                
                if(!$result_cln){
                    $arr = array('msg' => "", 'error' => 'Unknown Exception occurred. Please check the application log for more details.');
                    $jsn = json_encode($arr);
                    trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
                    trigger_error(mysql_error());
                    print_r($jsn);
                }else{
                    $arr = array('msg' => "Generated estimate Successfully!!!", 'error' => '');
                    $jsn = json_encode($arr);
                    print_r($jsn);
                }
                
               

            }
        }
        
    }

}

?>
