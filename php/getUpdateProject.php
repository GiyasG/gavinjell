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
      $res[0]['description'] = html_entity_decode($res[0]['description']);
      $res[0]['description'] = str_replace('"','\'',$res[0]['description']);

      $db->select('teams','id, title, name, surname');
      $team = $db->getResult();
      // print_r ($team);
      // echo "Team:";
      if (isset($team)) {
        foreach ($team as $key => $value) {
          // echo "key: ";
          // print_r ($key);
          // echo "value: ";
          // print_r ($value);

          $res[0]['team'][$key]["id"] = $team[$key]["id"];
          $res[0]['team'][$key]['name'] = $team[$key]["title"]." ".$team[$key]["name"]." ".$team[$key]["surname"];
        }
        // print_r (json_encode($res[0]['team']));

      }

    $db->select('photos','image',null,'project_id='.$res[0]['id']);
    $photo = $db->getResult();
    if (isset($photo[0])) {
      $res[0]['image'] = $photo[0]["image"];
    }


    $outp = json_encode($res);

    echo ($outp);

  }
  $db->disconnect();
}

?>
