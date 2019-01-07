<?php
session_start();
// print_r ($_SESSION);

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
if (isset($db)) {
  $tb = new Table();
  $res = $tb->get_ParentResult('authority');
// print_r ($res);
  $outp1 = "";

  foreach ($res as $rs) {
      if ($outp1 != "") {$outp1 .= ",";}
      $outp1 .= '{"id":"'.$rs["id"].'",';
      $outp1 .= '"title":"'.$rs["title"].'",';
      $outp1 .= '"name":"'.$rs["name"].'",';
      $outp1 .= '"surname":"'.$rs["surname"].'",';
      $outp1 .= '"position":"'.$rs["position"].'"}';
  }

  $outp1 ='{"all":['.$outp1.']}';
} else {
  $outp1 ='{"all":["No items found"]}';
}

if (isset($_SESSION['cart'])) {
  // var_dump($_SESSION);
  $outp2 = "";
  foreach ($_SESSION['cart'] as $rs) {
      if ($outp2 != "") {$outp2 .= ",";}
      $outp2 .= '{"name":"'.$rs["sname"].'",';
      $outp2 .= '"description":"'.$rs["sdescription"].'",';
      $outp2 .= '"price":"'.$rs["sprice"].'",';
      $outp2 .= '"size":"'.$rs["size"].'",';
      $outp2 .= '"quantity":"'.$rs["quantity"].'",';
      $outp2 .= '"image":"'.$rs["simage"].'"}';
  }
  $outp2 ='{"cart":['.$outp2.']}';
} else {
  // var_dump($_SESSION);
  $outp2 = '{"cart": null}';
}
$outp = '{"items":['.$outp1.','.$outp2.','.$outp3.']}';

$db->disconnect();

echo ($outp);
?>
