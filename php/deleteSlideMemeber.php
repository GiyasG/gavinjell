<?php
require '../vendor/autoload.php';
  $db1 = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db1);
$outp3 = "";
if (($auth->isLoggedIn()) && ($auth->hasRole(\Delight\Auth\Role::ADMIN))) {
  $outp3 = '{"AdminIsIn":true}';
  $adminOk = true;
} else {
  $outp3 = '{"AdminIsIn":false}';
  $adminOk = false;
}

if ($adminOk) {
  if (isset($_POST)) {
    include('class/mysql_crud.php');
    $db = new Database();
    $db->connect();
    $db->delete('slides', 'idofdb ='.$_POST["itemid"].' and nameofdb =\''.$_POST["nofdb"].'\''); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
    $res = $db->getResult();
    print_r ($res);
    if (!$res) {
      die('Cant connect: ' . mysql_error());
    } else {
              echo '{"info":"Deleted"}';
        }
    $db->disconnect();
  }
}
?>
