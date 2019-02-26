<?php
session_start();
if ( isset($_GET['searching'])) {
  if ($_GET['searching'] !="") {
    $searching = $_GET['searching'];
  } else {
    $outp = '{"items":{"0":{"0":[null]}}}';

    echo ($outp);
    return;
  }
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('class/mysql_crud.php');
$db = new Database();
$db->connect();

if (isset($db)) {
  $db->select('projects','*',null, 'title LIKE \'%'.$searching.'%\' || description LIKE \'%'.$searching.'%\''); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
  $res1 = $db->getResult();
  $db->select('papers','*',null, 'title LIKE \'%'.$searching.'%\' || description LIKE \'%'.$searching.'%\''); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
  $res2 = $db->getResult();

$res = [];
if (sizeof($res1) != 0 && sizeof($res2) != 0) {
  foreach ($res1 as $key => $value) {
    $res1[$key]['db'] = 'project';
  }
  foreach ($res2 as $key => $value) {
    $res2[$key]['db'] = 'paper';
  }
  $res = array_merge($res1, $res2);
}
if (sizeof($res1) != 0 && sizeof($res2) == 0) {
  foreach ($res1 as $key => $value) {
    $res1[$key]['db'] = 'project';
  }
  $res = $res1;
}
if (sizeof($res1) == 0 && sizeof($res2) != 0) {
  foreach ($res2 as $key => $value) {
     $res2[$key]['db'] = 'paper';
  }
  $res = $res2;
}
if (sizeof($res1) == 0 && sizeof($res2) == 0) {
  $res[] = null;
}

$records_number  = sizeof($res);
$records_per_page = 3;
$whole_pages = floor($records_number/$records_per_page);
$last_page = $records_number-($whole_pages*$records_per_page);
$page_search = [];
$c_page = 0;


if ($last_page >= 0) {
  for ($l=0; $l <= $whole_pages-1; $l++) {
    for ($i=0; $i < $records_per_page; $i++) {
      $page_search[$l][$i] = array_shift($res);
    }
  }
}

if ($last_page > 0) {
  for ($i=0; $i < $last_page; $i++) {
    $page_search[$l][$i] = array_shift($res);
    }
  }
}

$outp = '{"items":['.json_encode($page_search).']}';

echo ($outp);
?>
