<?php

if ( $_POST ) {
    foreach ( $_POST as $key => $value ) {
        $postdata = json_decode($key);
        // print_r ($postdata);
    }
  }

if (isset($postdata->id)) {
  include('class/mysql_crud.php');
  $db = new Database();
  $db->connect();
  $db->setName('SET NAMES \'utf8\'');

  $db->select('projects','*',null,'authority_id='.$postdata->ida.' and id='.$postdata->id); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
  $res = $db->getResult();

// print_r($res);
  if (!$res) {
    die('Cant connect: ' . mysql_error());
  } else {
    $outp = "";
      foreach ($res as $rs) {
          if ($outp != "") {$outp .= ",";}

          $db->select('photos','filename',null,'project_id='.$rs['id']);
          $photo = $db->getResult();
          if (isset($photo[0])) {
            // print_r ($photo);
            $outp .= '{"image":"'.$photo[0]["filename"].'",';
          } else {
            $outp .= '{"image":"temp.jpg",';
          }

          $outp .= '"id":"'.$rs["id"].'",';
          $outp .= '"authority_id":"'.$rs["authority_id"].'",';
          $outp .= '"title":"'.$rs["title"].'",';
          $outp .= '"description":"'.$rs["description"].'",';
          $outp .= '"url":"'.$rs["url"].'",';
          $outp .= '"started":"'.$rs["started"].'",';
          $outp .= '"finished":"'.$rs["finished"].'"}';
      }

      $outp ='{"item":['.$outp.']}';
    echo ($outp);

  }
  $db->disconnect();
}

?>