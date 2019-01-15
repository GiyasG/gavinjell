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

  // print_r ($res);
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

$outp = '{"items":['.$outp1.','.$proj.','.$papr.','.$outp3.']}';

$db->disconnect();

echo ($outp);
?>
