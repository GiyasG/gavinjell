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

  $db->select('authority','*',null,'id='.$postdata->id); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
  $res = $db->getResult();

// print_r($res);
  if (!$res) {
    die('Cant connect: ' . mysql_error());
  } else {
    $outp = "";
      foreach ($res as $rs) {
          if ($outp != "") {$outp .= ",";}

          $db->select('photos','filename',null,'authority_id='.$rs['id']);
          $photo = $db->getResult();
          if (isset($photo[0])) {
            // print_r ($photo);
            $outp .= '{"image":"'.$photo[0]["filename"].'",';
          } else {
            $outp .= '{"image":"temp.jpg",';
          }

          $outp .= '"id":"'.$rs["id"].'",';
          $outp .= '"title":"'.$rs["title"].'",';
          $outp .= '"name":"'.$rs["name"].'",';
          $outp .= '"surname":"'.$rs["surname"].'",';
          $outp .= '"about":"'.$rs["about"].'",';
          $outp .= '"dob":"'.$rs["dob"].'",';
          $outp .= '"sex":"'.$rs["sex"].'",';
          $outp .= '"position":"'.$rs["position"].'"}';
      }

      $outp ='{"item":['.$outp.']}';
    echo ($outp);

  }
  $db->disconnect();
}

?>
