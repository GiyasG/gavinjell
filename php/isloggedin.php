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
    $res[0]['about'] = html_entity_decode($res[0]['about']);
    $res[0]['about'] = str_replace('"','\"',$res[0]['about']);
    // echo ($res[0]['about']);
  $outp3 ='{"all":['.json_encode($res).']}';
  // echo (json_encode($outp3));
} else {
  $outp3 ='{"all":["No items found"]}';
}

$outp = '{"isloggedin":['.$outp1.','.$outp2.','.$outp3.']}';
echo ($outp);
?>
