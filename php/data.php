<?php
session_start();
// print_r ($_GET);

if ( $_GET ) {
    foreach ( $_GET as $key => $value ) {
        $choosendb = $key;
    }
} else {
  $choosendb = "admin";
}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require '../vendor/autoload.php';
  $db1 = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db1);
$outp3 = "";
if (($auth->isLoggedIn()) && ($auth->hasRole(\Delight\Auth\Role::ADMIN))) {
  $outp3 = '{"AdminIsIn":true}';
} else {
  $outp3 = '{"AdminIsIn":false}';
}

include('class/mysql_crud.php');
$db = new Database();
$db->connect();

if (isset($db)) {
  $tb = new Table();
  $res = $tb->get_ParentResult('authority', 'photos');

  $outp1 ='{"all":['.json_encode($res).']}';
} else {
  $outp1 ='{"all":["No items found"]}';
}

/* PROJECTS */
  $res = $tb->get_ParentResult('authority', 'projects');
  $records_number  = sizeof($res);

  if ($choosendb == "projects") {
    $records_per_page = 3;
    $proj = Projects("projects", $db, $res, $records_number, $records_per_page);
  }  elseif ($choosendb == "admin") {
    $records_per_page = $records_number;
    $proj = Projects("projects",$db, $res, $records_number, $records_per_page);
  } elseif ($choosendb != "projects" && $choosendb != "admin") {
    $proj ='{"projects":null}';
  }


// echo $proj;
/* Publications */

$res = $tb->get_ParentResult('authority', 'papers');
$papr = "";

$records_number  = sizeof($res);

if ($choosendb == "papers") {
  $records_per_page = 3;
}  elseif ($choosendb == "admin") {
  $records_per_page = $records_number;
}

$whole_pages =  floor($records_number/$records_per_page);
// echo "whole: ".$whole_pages;
$last_page = $records_number-($whole_pages*$records_per_page);
// echo "last: ".$last_page;
$pages = $whole_pages + $last_page;
$page_papers = [];
$c_page = 0;
if ($last_page >= 0) {
  for ($l=0; $l <= $whole_pages-1; $l++) {
    for ($i=0; $i < $records_per_page; $i++) {
      $page_papers[$l][$i] = array_shift($res);
      $db->select('photos','filename',null,'paper_id='.$page_papers[$l][$i]['id']);
      $photo = $db->getResult();
      if (isset($photo[0])) {
        $page_papers[$l][$i]['image'] = $photo[0]["filename"];
      } else {
        $page_papers[$l][$i]['image'] = "temp.jpg";
      }
    }
  }
}
  if ($last_page > 0) {
  for ($i=0; $i < $last_page; $i++) {
    $page_papers[$l][$i] = array_shift($res);
    $db->select('photos','filename',null,'paper_id='.$page_papers[$l][$i]['id']);
    $photo = $db->getResult();
    if (isset($photo[0])) {
      $page_papers[$l][$i]['image'] = $photo[0]["filename"];
    } else {
      $page_papers[$l][$i]['image'] = "temp.jpg";
    }
  }
}
$papr = '{"papers":['.json_encode($page_papers).']}';

if (!isset($papr)) {
  $papr ='{"papers":null}';
}

/* TEAMS */

if ($choosendb == "teams" ) {

$res = $tb->get_ParentResult('authority', 'teams');
$team = "";

// echo sizeof($res);
foreach ($res as $rs) {
    if ($team != "") {$team .= ",";}
    $db->select('photos','filename',null,'team_id='.$rs['id']);
    $photo = $db->getResult();
    if (isset($photo[0])) {
      // print_r ($photo);
      $team .= '{"image":"'.$photo[0]["filename"].'",';
    } else {
      $team .= '{"image":"temp.jpg",';
    }
    // $team .= '{"authority_id":"'.$rs["authority_id"].'",';
    $team .= '"id":"'.$rs["id"].'",';
    $team .= '"authority_id":"'.$rs["authority_id"].'",';
    $team .= '"title":"'.$rs["title"].'",';
    $team .= '"name":"'.$rs["name"].'",';
    $team .= '"surname":"'.$rs["surname"].'",';
    $team .= '"dob":"'.$rs["dob"].'"}';
}

$team ='{"teams":['.$team.']}';
} else {
  $team ='{"teams":null}';
}


$outp = '{"items":['.$outp1.','.$proj.','.$papr.','.$team.','.$outp3.']}';

$db->disconnect();

echo ($outp);

function Projects($dbname, $db, $res, $records_number, $records_per_page)
{
  $proj = "";

  $whole_pages =  floor($records_number/$records_per_page);
  // echo "whole: ".$whole_pages;
  $last_page = $records_number-($whole_pages*$records_per_page);
  // echo "last: ".$last_page;
  $pages = $whole_pages + $last_page;
  $page_projects = [];
  $c_page = 0;
  if ($last_page >= 0) {
    for ($l=0; $l <= $whole_pages-1; $l++) {
      for ($i=0; $i < $records_per_page; $i++) {
        $page_projects[$l][$i] = array_shift($res);
        $db->select('photos','filename',null,'project_id='.$page_projects[$l][$i]['id']);
        $photo = $db->getResult();
        if (isset($photo[0])) {
          $page_projects[$l][$i]['image'] = $photo[0]["filename"];
        } else {
          $page_projects[$l][$i]['image'] = "temp.jpg";
        }
      }
    }
  }
  if ($last_page > 0) {
    for ($i=0; $i < $last_page; $i++) {
      $page_projects[$l][$i] = array_shift($res);
      $db->select('photos','filename',null,'project_id='.$page_projects[$l][$i]['id']);
      $photo = $db->getResult();
      if (isset($photo[0])) {
        $page_projects[$l][$i]['image'] = $photo[0]["filename"];
      } else {
        $page_projects[$l][$i]['image'] = "temp.jpg";
      }
    }
  }
  $proj = '{"projects":['.json_encode($page_projects).']}';

  if (!isset($proj)) {
    $proj ='{"projects":null}';
  }
  return $proj;
}
?>
