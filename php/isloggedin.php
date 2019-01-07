<?php
session_start();

require '../vendor/autoload.php';
  $db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db);
  $outp1 = "";
  if ($auth->isLoggedIn()) {
    $outp1 ='{"isIn":true}';
    if ($auth->hasRole(\Delight\Auth\Role::ADMIN)) {
      $outp3 = '{"Role": "Admin"}';
    } else {
      $outp3 = '{"Role": null}';
    }
  } else {
    $outp1 ='{"isIn":false}';
    $outp3 = '{"Role": null}';
  }

if (isset($_SESSION['cart'])) {
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
  $outp2 ='{"items":['.$outp2.']}';
} else {
  $outp2 = '{"items": null}';
}
$outp = '{"isloggedin":['.$outp1.','.$outp2.','.$outp3.']}';
echo ($outp);
?>
