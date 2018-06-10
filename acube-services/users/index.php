<?php



$json = <<<JSON
[
  {"ID":"W1","ID_NAME":"bijesh","TASK_ID":"01","TASK_NAME":"bijesh1"},
  {"ID":"W1","ID_NAME":"bijesh","TASK_ID":"02","TASK_NAME":"bijesh2"},
  {"ID":"W1","ID_NAME":"ajay","TASK_ID":"01","TASK_NAME":"ajay1"},

  {"ID":"W2","ID_NAME":"bijesh","TASK_ID":"04","TASK_NAME":"bijesh3"},
  {"ID":"W2","ID_NAME":"Bijesh","TASK_ID":"05","TASK_NAME":"bijesh4"},
  {"ID":"W2","ID_NAME":"ajay","TASK_ID":"Q04","TASK_NAME":"ajay2"}
  
]
JSON;

// Decode your JSON and create a placeholder array
$objects = json_decode($json);
$grouped = array();

// Loop JSON objects
foreach($objects as $object) {
    if(!array_key_exists($object->ID, $grouped)) { // a new ID...
         $newObject = new stdClass();

         // Copy the ID/ID_NAME, and create an ITEMS placeholder
         $newObject->ID = $object->ID;
        // $newObject->ID_NAME = $object->ID_NAME;
          $newObject->NAMES = array();//$object->ID_NAME;
       //  $newObject->ITEMS = array();

         // Save this new object
         $grouped[$object->ID] = $newObject;
    }

 if(!array_key_exists($object->ID_NAME, $grouped)) { // a new ID..
    $taskObject = new stdClass();

    // Copy the TASK/TASK_NAME
  //$taskObject->TASK_ID = $object->TASK_ID;
    $taskObject->ID_NAME = $object->ID_NAME;

    $taskObject->ITEMS = array();//$object->ID_NAME;


    // Append this new task to the ITEMS array
    $grouped[$object->ID]->NAMES[] = $taskObject;
}

if(!array_key_exists($object->TASK_ID, $grouped)) { // a new ID..
    $taskObject1 = new stdClass();

    // Copy the TASK/TASK_NAME
  //$taskObject->TASK_ID = $object->TASK_ID;
    $taskObject1->TASK_ID = $object->TASK_ID;

    


    // Append this new task to the ITEMS array
    $grouped[$object->NAMES]->ITEMS[] = $taskObject1;
}


// $taskObject1 = new stdClass();

//     // Copy the TASK/TASK_NAME
//    // $taskObject->TASK_ID = $object->TASK_ID;

//     $taskObject1->TASK_NAME = $object->TASK_NAME;


    // Append this new task to the ITEMS array
   // $grouped[$object->ID_NAME]->ITEMS[] = $taskObject1;

}

// We use array_values() to remove the keys used to identify similar objects
// And then re-encode this data :)
$grouped = array_values($grouped);
$json = json_encode($grouped);


/*

// Your JSON array of objects
$json = <<<JSON
[
  {"WEEK":"W1","NAME":"MOHAN","TASK_DATE":"2018-01-01","TASK_PRESENT":"1"},
  {"WEEK":"W1","NAME":"MOHAN","TASK_DATE":"2018-01-02","TASK_PRESENT":"1"},
  {"WEEK":"W1","NAME":"MOHAN","TASK_DATE":"2018-01-03","TASK_PRESENT":"1"},
  {"WEEK":"W1","NAME":"MOHAN","TASK_DATE":"2018-01-04","TASK_PRESENT":"1"},

  {"WEEK":"W1","NAME":"RAGHU","TASK_DATE":"2018-01-01","TASK_PRESENT":"1"},
  {"WEEK":"W1","NAME":"RAGHU","TASK_DATE":"2018-01-02","TASK_PRESENT":"1"},
  {"WEEK":"W1","NAME":"RAGHU","TASK_DATE":"2018-01-03","TASK_PRESENT":"1"},
  {"WEEK":"W1","NAME":"RAGHU","TASK_DATE":"2018-01-04","TASK_PRESENT":"1"},
  

  {"WEEK":"W2","NAME":"RAGHU","TASK_DATE":"2018-01-05","TASK_PRESENT":"1"},
  {"WEEK":"W2","NAME":"RAGHU","TASK_DATE":"2018-01-06","TASK_PRESENT":"1"},
  {"WEEK":"W2","NAME":"RAGHU","TASK_DATE":"2018-01-07","TASK_PRESENT":"1"},
  {"WEEK":"W2","NAME":"RAGHU","TASK_DATE":"2018-01-08","TASK_PRESENT":"1"}
]
JSON;

// Decode your JSON and create a placeholder array
$objects = json_decode($json);
$grouped = array();

// Loop JSON objects
foreach($objects as $object) {
    if(!array_key_exists($object->WEEK, $grouped)) { // a new ID...
         $newObject = new stdClass();

         // Copy the ID/ID_NAME, and create an ITEMS placeholder
         $newObject->WEEK = $object->WEEK;
         $newObject->TMSNAMES = array();//object->ID_NAME;

         // Save this new object
         $grouped[$object->WEEK] = $newObject;


    }

    $taskObject = new stdClass();

    $taskObject->NAME = $object->NAME;
    $taskObject->TASK_DATE = $object->TASK_DATE;
    $taskObject->TASK_PRESENT = $object->TASK_PRESENT;



    // Append this new task to the ITEMS array
    $grouped[$object->WEEK]->TMSNAMES[] = $taskObject;
}



// We use array_values() to remove the keys used to identify similar objects
// And then re-encode this data :)
$grouped = array_values($grouped);
$json = json_encode($grouped);
*/
echo $json;

?>
