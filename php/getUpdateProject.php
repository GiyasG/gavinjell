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
    $db->select('photos','image',null,'project_id='.$res[0]['id']);
    $photo = $db->getResult();
    if (isset($photo[0])) {
      $res[0]['image'] = $photo[0]["image"];
    }
    $outp = json_encode($res);
    $outp =htmlspecialchars_decode('{"item":['.$outp.']}');
    echo ($outp);

  }
  $db->disconnect();
}

?>
