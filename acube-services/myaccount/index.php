<?php
include('../users/config.php');
include('../config/log_handler.php');

switch($_GET['action']) {
  case 'get_travel_data' :
  get_travel_data();
  break;

}

//get_travel_data();

/** Function to Get Product **/

function get_travel_data() {
  global $con;

  //https://api.spotify.com/v1/search?query=iron+&offset="+($scope.currentPage-1)*$scope.limit+"&limit=20&type=artist")
  
  $limit = $_GET['limit'];
  $offset = $_GET['offset'];

  $qry_count = mysqli_query($con,"SELECT * from tbl_travel");
  $num_rows = mysqli_num_rows($qry_count);

  $qry = mysqli_query($con,"SELECT * from tbl_travel LIMIT $limit OFFSET $offset");
  $data = array();
  while($rows = mysqli_fetch_array($qry))
  {
    $data_item[] = array(
      "id" => $rows['travel_id'],
      "icon" => $rows['travel_icon'],
      "source" => $rows['travel_source'],
      "destination" => $rows['travel_destination'],
      "pnr" => $rows['travel_pnr'],
      "traveldate" => $rows['travel_date'],
      "bookeddate" => $rows['travel_booked_date'],
      "status" => $rows['travel_status'],
      "amount" => $rows['travel_amount'],
      "comment" => $rows['travel_comment']
    );
  }
  $data_total=array("TOTAL"=> $num_rows);
  $data[]->item = $data_item;
  $data[]->total = $data_total;
  echo(json_encode($data));
  return json_encode($data);
}

?>
