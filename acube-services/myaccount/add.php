<?php
include('../users/config.php');
include('../config/log_handler.php');

switch($_GET['action']) {
  case 'push_travel_data' :
  push_travel_data();
  break;
}

  /** Function to Push Product **/
  function push_travel_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    $travel_icon = $data->icon;
    $travel_source = $data->source;
    $travel_destination = $data->destination;
    $travel_pnr = $data->pnr;
    $travel_date = $data->traveldate;
    $travel_booked_date = $data->bookeddate;
    $travel_status = $data->status;
    $travel_amount = $data->amount;
    $travel_comment = $data->comment;

    $qry = "INSERT INTO tbl_travel (travel_icon,travel_source,travel_destination,travel_pnr,travel_date,travel_booked_date,travel_status,travel_amount,travel_comment) VALUES ('$travel_icon','$travel_source','$travel_destination','$travel_pnr','$travel_date','$travel_booked_date','$travel_status','$travel_amount','$travel_comment')";
    $qry_res = mysql_query($qry);
    if ($qry_res) {
    $arr = array('msg' => "Product Added Successfully!!!", 'error' => '');
    $jsn = json_encode($arr);
    // print_r($jsn);
    }
    else {
    $arr = array('msg' => "", 'error' => 'Error In inserting record');
    $jsn = json_encode($arr);
    // print_r($jsn);
    }
  }




?>
