<?php
session_start();

if ( $_POST ) {
    foreach ( $_POST as $key => $value ) {
    }
}

require '../vendor/autoload.php';

if ($key === 'logOut') {
  $db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db);
  $outp1 = "";
  if ($auth->isLoggedIn()) {
    $auth->logOut();
    $outp1 ='{"isIn":false}';
  } else {
    $outp1 ='{"isIn":true}';
  }

  if (isset($_SESSION['cart'])) {
    $_SESSION['cart'] =array();
    unset($_SESSION['cart']);
    // var_dump($_SESSION);
    session_regenerate_id(true);
  }
}
$outp2 ='{"items":null}';
$outp = '{"isloggedin":['.$outp1.','.$outp2.']}';
echo ($outp);
?>
