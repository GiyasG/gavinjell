<?php
session_start();
// print_r ($_GET);

if ( $_GET ) {
    foreach ( $_GET as $key => $value ) {
        $choosendb = $key;
    }
} else {
  $choosendb = "admin";
}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require '../vendor/autoload.php';
  $db1 = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db1);
$outp3 = "";
if (($auth->isLoggedIn()) && ($auth->hasRole(\Delight\Auth\Role::ADMIN))) {
  $outp3 = '{"AdminIsIn":true}';
} else {
  $outp3 = '{"AdminIsIn":false}';
}

include('class/mysql_crud.php');
$db = new Database();
$db->connect();

if (isset($db)) {
  $tb = new Table();
  $res = $tb->get_ParentResult('authority', 'photos');

// print_r ($res);

  $outp1 = "";

  foreach ($res as $rs) {
      if ($outp1 != "") {
      $outp1 .= ",";}
      $outp1 .= '{"authority_id":"'.$rs["authority_id"].'",';
      $outp1 .= '"title":"'.$rs["title"].'",';
      $outp1 .= '"name":"'.$rs["name"].'",';
      $outp1 .= '"surname":"'.$rs["surname"].'",';
      $outp1 .= '"about":"'.$rs["about"].'",';
      $outp1 .= '"image":"'.$rs["filename"].'",';
      $outp1 .= '"position":"'.$rs["position"].'"}';

  }

  $outp1 ='{"all":['.$outp1.']}';
} else {
  $outp1 ='{"all":["No items found"]}';
}


if ($choosendb == "projects" || $choosendb == "admin") {

  $res = $tb->get_ParentResult('authority', 'projects');
  $proj = "";

  $records_number  = sizeof($res);
  $records_per_page = 5;
  $whole_pages =  floor($records_number/$records_per_page);
  echo "whole: ".$whole_pages;
  $last_page = $records_number-($whole_pages*$records_per_page);
  echo "last: ".$last_page;
  $pages = $whole_pages + $last_page;
  $page_projects = [];
  $c_page = 0;
  if ($last_page > 0) {
    for ($l=1; $l <= $whole_pages; $l++) {
      for ($i=0; $i < $records_per_page-1; $i++) {
        array_shift($page_projects[$i], $res);
      }
    }
}
  //   for ($i=0; $i < $pages-1 ; $i++) {
  //     echo "i: ".$i;
  //     print_r(array_slice($res, $records_per_page));
  //   }
  //     array_push($page_projects, $res);
  // } else {
  //   for ($i=0; $i < $pages-1 ; $i++) {
  //     array_push($page_projects, array_slice($res, $records_per_page));
  //   }
  // }

  print_r ($page_projects);
  foreach ($res as $rs) {
      if ($proj != "") {$proj .= ",";}

      $db->select('photos','filename',null,'project_id='.$rs['id']);
      $photo = $db->getResult();
      if (isset($photo[0])) {
        // print_r ($photo);
        $proj .= '{"image":"'.$photo[0]["filename"].'",';
      } else {
        $proj .= '{"image":"temp.jpg",';
      }

      $proj .= '"id":"'.$rs["id"].'",';
      $proj .= '"authority_id":"'.$rs["authority_id"].'",';
      $proj .= '"title":"'.$rs["title"].'",';
      $proj .= '"description":"'.$rs["description"].'",';
      $proj .= '"url":"'.$rs["url"].'",';
      $proj .= '"started":"'.$rs["started"].'",';
      $proj .= '"finished":"'.$rs["finished"].'"}';
  }

  $proj ='{"projects":['.$proj.']}';
} else {
  $proj ='{"projects":null}';
}

if ($choosendb == "papers" || $choosendb == "admin") {

$res = $tb->get_ParentResult('authority', 'papers');
$papr = "";
// echo sizeof($res);

foreach ($res as $rs) {
    if ($papr != "") {$papr .= ",";}
    $db->select('photos','filename',null,'paper_id='.$rs['id']);
    $photo = $db->getResult();
    if (isset($photo[0])) {
      // print_r ($photo);
      $papr .= '{"image":"'.$photo[0]["filename"].'",';
    } else {
      $papr .= '{"image":"temp.jpg",';
    }
    // $papr .= '{"authority_id":"'.$rs["authority_id"].'",';
    $papr .= '"id":"'.$rs["id"].'",';
    $papr .= '"authority_id":"'.$rs["authority_id"].'",';
    $papr .= '"title":"'.$rs["title"].'",';
    $papr .= '"description":"'.$rs["description"].'",';
    $papr .= '"url":"'.$rs["url"].'",';
    $papr .= '"published":"'.$rs["published"].'"}';
}

$papr ='{"papers":['.$papr.']}';
} else {
  $papr ='{"papers":null}';
}

if ($choosendb == "teams" || $choosendb == "admin") {

$res = $tb->get_ParentResult('authority', 'teams');
$team = "";

// echo sizeof($res);
foreach ($res as $rs) {
    if ($team != "") {$team .= ",";}
    $db->select('photos','filename',null,'team_id='.$rs['id']);
    $photo = $db->getResult();
    if (isset($photo[0])) {
      // print_r ($photo);
      $team .= '{"image":"'.$photo[0]["filename"].'",';
    } else {
      $team .= '{"image":"temp.jpg",';
    }
    // $team .= '{"authority_id":"'.$rs["authority_id"].'",';
    $team .= '"id":"'.$rs["id"].'",';
    $team .= '"authority_id":"'.$rs["authority_id"].'",';
    $team .= '"title":"'.$rs["title"].'",';
    $team .= '"name":"'.$rs["name"].'",';
    $team .= '"surname":"'.$rs["surname"].'",';
    $team .= '"dob":"'.$rs["dob"].'"}';
}

$team ='{"teams":['.$team.']}';
} else {
  $team ='{"teams":null}';
}


$outp = '{"items":['.$outp1.','.$proj.','.$papr.','.$team.','.$outp3.']}';

$db->disconnect();

echo ($outp);
?>
