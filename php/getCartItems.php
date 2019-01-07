<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ( $_POST ) {
    foreach ( $_POST as $key => $value ) {
        $postdata = json_decode($key);
        // print_r ($postdata);
    }
  }

$pref = time();
include('class/mysql_crud.php');
$si = $postdata->id;
$sz = $postdata->siz;

if ($si == null or (!isset($postdata->qty))) {
  $qt = '';
  $outp ='{"cart":null}';
} else {
  $qt = $postdata->qty;
}

  if (isset($_SESSION['cart'])) {
    $subarray_number = 0;
    foreach ($_SESSION['cart'] as $k => $v) {
      if ($v['id']==$si and $v['size']==$sz) {
        $idfound = true ;
        $subarray_number = $k;
        // echo $k;
        break;
      }
    }
  }


  if(!isset($_SESSION['cart']) and $qt != '' and $sz != '')
  {
    // echo "HELLO";
    $db = new Database();
    $db->connect();
    $db->setName('SET NAMES \'utf8\'');
    // $db->sql("SET NAMES 'utf8'")
    $db->select('stock','*',null,'id=\''.$si.'\''); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
    $res = $db->getResult();
    // print_r($res);


    $res[0]['quantity'] = $qt;
    $res[0]['size'] = $sz;
    $_SESSION['cart'] = $res;
    $outp = "";
    foreach ($res as $rs) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"name":"'.$rs["sname"].'",';
        $outp .= '"description":"'.$rs["sdescription"].'",';
        $outp .= '"price":"'.$rs["sprice"].'",';
        $outp .= '"size":"'.$rs["size"].'",';
        $outp .= '"quantity":"'.$rs["quantity"].'",';
        $outp .= '"image":"'.$rs["simage"].'"}';
    }

    $outp ='{"cart":['.$outp.']}';
  }
  elseif (!isset($idfound)  and $qt != '' and $sz != '')
  {
    $db = new Database();
    $db->connect();
    $db->setName('SET NAMES \'utf8\'');
    // $db->sql("SET NAMES 'utf8'")
    $db->select('stock','*',null,'id=\''.$si.'\''); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
    $res = $db->getResult();


    $res[0]['quantity'] = $qt;
    $res[0]['size'] = $sz;

    $merged = array_merge($_SESSION['cart'], $res);
    $outp = "";
    foreach ($merged as $rs) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"name":"'.$rs["sname"].'",';
        $outp .= '"description":"'.$rs["sdescription"].'",';
        $outp .= '"price":"'.$rs["sprice"].'",';
        $outp .= '"size":"'.$rs["size"].'",';
        $outp .= '"quantity":"'.$rs["quantity"].'",';
        $outp .= '"image":"'.$rs["simage"].'"}';
    }

    $outp ='{"cart":['.$outp.']}';
    $_SESSION['cart'] = $merged;

  } elseif (isset($idfound) and $qt != '' and $sz != '') {
    $_SESSION['cart'][$subarray_number]['quantity'] += $qt;
    $outp = "";
    foreach ($_SESSION['cart'] as $rs) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"name":"'.$rs["sname"].'",';
        $outp .= '"description":"'.$rs["sdescription"].'",';
        $outp .= '"price":"'.$rs["sprice"].'",';
        $outp .= '"size":"'.$rs["size"].'",';
        $outp .= '"quantity":"'.$rs["quantity"].'",';
        $outp .= '"image":"'.$rs["simage"].'"}';
    }
    $outp ='{"cart":['.$outp.']}';
  }
  if (isset($_SESSION['cart']) and $qt === 0) {
    $outp = "";
    foreach ($_SESSION['cart'] as $rs) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"name":"'.$rs["sname"].'",';
        $outp .= '"description":"'.$rs["sdescription"].'",';
        $outp .= '"price":"'.$rs["sprice"].'",';
        $outp .= '"size":"'.$rs["size"].'",';
        $outp .= '"quantity":"'.$rs["quantity"].'",';
        $outp .= '"image":"'.$rs["simage"].'"}';
    }
    $outp ='{"cart":['.$outp.']}';
  } elseif (!isset($_SESSION['cart']) and $qt === 0) {
    $outp ='{"cart":null}';
  }

echo ($outp);

?>
