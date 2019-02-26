<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// $pref = time();
include('class/mysql_crud.php');
$si = $_GET['id'];
$qt = $_GET['qty'];
$sz = $_GET['sz'];


if ($si == '') {
  $_SESSION['cart'] =array();
  unset($_SESSION['cart']);
  if(isset($_SESSION['cart'])) {
  session_regenerate_id(true);
  }
} else {
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
        // for ($i=39; $i < 45; $i++) {
        //   $outp .= '"'.$i.'all":"'.$rs["s".$i."_all"].'",';
        //   $outp .= '"'.$i.'reserv":"'.$rs["s".$i."_reserved"].'",';
        //   $outp .= '"'.$i.'forsale":"'.$rs["s".$i."_forsale"].'",';
        //   $outp .= '"'.$i.'sold":"'.$rs["s".$i."_sold"].'",';
        // }
        $outp .= '"size":"'.$rs["size"].'",';
        $outp .= '"quantity":"'.$rs["quantity"].'",';
        $outp .= '"image":"'.$rs["simage"].'"}';
    }

    $outp ='{"items":['.$outp.']}';
    // echo gettype($outp);
  }
  elseif (!isset($idfound)  and $qt != '' and $sz != '')
  {
    // echo $idfound;

    $db = new Database();
    $db->connect();
    $db->setName('SET NAMES \'utf8\'');
    // $db->sql("SET NAMES 'utf8'")
    $db->select('stock','*',null,'id=\''.$si.'\''); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
    $res = $db->getResult();


    $res[0]['quantity'] = $qt;
    $res[0]['size'] = $sz;

    $merged = array_merge($_SESSION['cart'], $res);
    // print_r($merged);
    $outp = "";
    foreach ($merged as $rs) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"name":"'.$rs["sname"].'",';
        $outp .= '"description":"'.$rs["sdescription"].'",';
        $outp .= '"price":"'.$rs["sprice"].'",';
        // for ($i=39; $i < 45; $i++) {
        //   $outp .= '"'.$i.'all":"'.$rs["s".$i."_all"].'",';
        //   $outp .= '"'.$i.'reserv":"'.$rs["s".$i."_reserved"].'",';
        //   $outp .= '"'.$i.'forsale":"'.$rs["s".$i."_forsale"].'",';
        //   $outp .= '"'.$i.'sold":"'.$rs["s".$i."_sold"].'",';
        // }
        $outp .= '"size":"'.$rs["size"].'",';
        $outp .= '"quantity":"'.$rs["quantity"].'",';
        $outp .= '"image":"'.$rs["simage"].'"}';
    }

    $outp ='{"items":['.$outp.']}';
    $_SESSION['cart'] = $merged;

  } elseif (isset($idfound) and $qt != '' and $sz != '') {
    // echo $idfound;
    $_SESSION['cart'][$subarray_number]['quantity'] += $qt;
    // print_r($_SESSION['cart']);
    $outp = "";
    foreach ($_SESSION['cart'] as $rs) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"name":"'.$rs["sname"].'",';
        $outp .= '"description":"'.$rs["sdescription"].'",';
        $outp .= '"price":"'.$rs["sprice"].'",';
        // for ($i=39; $i < 45; $i++) {
        //   $outp .= '"'.$i.'all":"'.$rs["s".$i."_all"].'",';
        //   $outp .= '"'.$i.'reserv":"'.$rs["s".$i."_reserved"].'",';
        //   $outp .= '"'.$i.'forsale":"'.$rs["s".$i."_forsale"].'",';
        //   $outp .= '"'.$i.'sold":"'.$rs["s".$i."_sold"].'",';
        // }
        $outp .= '"size":"'.$rs["size"].'",';
        $outp .= '"quantity":"'.$rs["quantity"].'",';
        $outp .= '"image":"'.$rs["simage"].'"}';
    }
    $outp ='{"items":['.$outp.']}';
  }

    // if (!isset($outp) and !isset($_SESSION['cart'])) {
    //   $outp = "";
    // }
echo ($outp);
}

?>
