<?php

if ( $_POST ) {
    foreach ( $_POST as $key => $value ) {
        $postdata = json_decode($key);
        // print_r ($postdata);
        // print_r ($postdata);
    }
  }

if (isset($postdata->id)) {
  include('class/mysql_crud.php');
  $db = new Database();
  $db->connect();
  $db->setName('SET NAMES \'utf8\'');
  $db->select('stock','*',null,'id='.$postdata->id); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
  $res = $db->getResult();

// print_r($res);
  if (!$res) {
    die('Cant connect: ' . mysql_error());
  } else {
    $outp = "";
      foreach ($res as $rs) {
          if ($outp != "") {$outp .= ",";}
          $outp .= '{"id":"'.$rs["id"].'",';
          $outp .= '"name":"'.$rs["sname"].'",';
          $outp .= '"description":"'.$rs["sdescription"].'",';
          $outp .= '"price":"'.$rs["sprice"].'",';
          for ($i=39; $i<46; $i++) {
            $outp .= '"size'.$i.'all":"'.$rs["s".$i."_all"].'",';
            $outp .= '"size'.$i.'reserved":"'.$rs["s".$i."_reserved"].'",';
            $outp .= '"size'.$i.'forsale":"'.$rs["s".$i."_forsale"].'",';
            $outp .= '"size'.$i.'sold":"'.$rs["s".$i."_sold"].'",';
          }
          $outp .= '"image":"'.$rs["simage"].'"}';
      }

      $outp ='{"item":['.$outp.']}';
    echo ($outp);

  }
  $db->disconnect();
}

?>
