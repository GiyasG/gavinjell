<?php
session_start();

require '../vendor/autoload.php';
  $db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db);
  $outp1 = "";
  if ($auth->isLoggedIn()) {
    $outp1 ='{"isIn":true}';
    if ($auth->hasRole(\Delight\Auth\Role::ADMIN)) {
      $outp2 = '{"Role": "Admin"}';
    } else {
      $outp2 = '{"Role": null}';
    }
  } else {
    $outp1 ='{"isIn":false}';
    $outp2 = '{"Role": null}';
  }

  include('class/mysql_crud.php');
  $db = new Database();
  if (isset($db)) {
    $tb = new Table();
    $res = $tb->get_ParentResult('authority', 'photos');
  // print_r ($res);
    $outp3 = "";

    foreach ($res as $rs) {
        if ($outp3 != "") {$outp3 .= ",";}
        $outp3 .= '{"id":"'.$rs["id"].'",';
        $outp3 .= '"title":"'.$rs["title"].'",';
        $outp3 .= '"name":"'.$rs["name"].'",';
        $outp3 .= '"surname":"'.$rs["surname"].'",';
        $outp3 .= '"about":"'.$rs["about"].'",';
        $outp3 .= '"image":"'.$rs["filename"].'",';
        $outp3 .= '"position":"'.$rs["position"].'"}';
        // echo ($rs["about"]);
    }

    $outp3 ='{"all":['.$outp3.']}';
  } else {
    $outp3 ='{"all":["No items found"]}';
  }

$outp = '{"isloggedin":['.$outp1.','.$outp2.','.$outp3.']}';
echo ($outp);
?>
