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

  // print_r ($res);
  $res[0]['about'] = html_entity_decode($res[0]['about']);
  $res[0]['about'] = str_replace('"','\"',$res[0]['about']);

  $outp1 ='{"all":['.json_encode($res).']}';
} else {
  $outp1 ='{"all":["No items found"]}';
}

/* PROJECTS */
  $res = $tb->get_ParentResult('authority', 'projects');
  $records_number  = sizeof($res);
  $records_per_page = 3;

  if ($choosendb == "projects") {
    $proj = Projects("projects", $db, $res, $records_number, $records_per_page);
  }  elseif ($choosendb == "admin") {
    $records_per_page = $records_number;
    $proj = Projects("projects",$db, $res, $records_number, $records_per_page);
  } elseif ($choosendb != "projects" && $choosendb != "admin") {
    $proj ='{"projects":null}';
  }

/* Publications */

$res = $tb->get_ParentResult('authority', 'papers');
$records_number  = sizeof($res);
$records_per_page = 3;

if ($choosendb == "papers") {
  $papr = Projects("papers", $db, $res, $records_number, $records_per_page);
}  elseif ($choosendb == "admin") {
  $records_per_page = $records_number;
  $papr = Projects("papers",$db, $res, $records_number, $records_per_page);
} elseif ($choosendb != "papers" && $choosendb != "admin") {
  $papr ='{"papers":null}';
}

/* TEAMS */

$res = $tb->get_ParentResult('authority', 'teams');
$records_number  = sizeof($res);
$records_per_page = 3;

if ($choosendb == "teams") {
  $team = Projects("teams", $db, $res, $records_number, $records_per_page);
}  elseif ($choosendb == "admin") {
  $records_per_page = $records_number;
  $team = Projects("teams",$db, $res, $records_number, $records_per_page);
} elseif ($choosendb != "teams" && $choosendb != "admin") {
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
        switch ($dbname) {
          case 'projects':
            $db->select('photos','image',null,'project_id='.$page_projects[$l][$i]['id']);
            break;
          case 'papers':
            $db->select('photos','image',null,'paper_id='.$page_projects[$l][$i]['id']);
            break;
          case 'teams':
            $db->select('photos','image',null,'team_id='.$page_projects[$l][$i]['id']);
            break;
          // default:
          //   // code...
          //   break;
        }
        $photo = $db->getResult();
        if (isset($photo[0])) {
          $page_projects[$l][$i]['image'] = $photo[0]["image"];
        } else {
          $page_projects[$l][$i]['image'] = "temp.jpg";
        }
      }
    }
  }
  if ($last_page > 0) {
    for ($i=0; $i < $last_page; $i++) {
      $page_projects[$l][$i] = array_shift($res);
      switch ($dbname) {
        case 'projects':
          $db->select('photos','image',null,'project_id='.$page_projects[$l][$i]['id']);
          break;
        case 'papers':
          $db->select('photos','image',null,'paper_id='.$page_projects[$l][$i]['id']);
          break;
        case 'teams':
          $db->select('photos','image',null,'team_id='.$page_projects[$l][$i]['id']);
          break;
        // default:
        //   // code...
        //   break;
      }

      $photo = $db->getResult();
      if (isset($photo[0])) {
        $page_projects[$l][$i]['image'] = $photo[0]["image"];
      } else {
        $page_projects[$l][$i]['image'] = "temp.jpg";
      }
    }
  }

  switch ($dbname) {
    case 'projects':
    print_r ($page_projects[0]);
      $page_projects[0]['description'] = html_entity_decode($page_projects[0]['description']);
      $page_projects[0]['description'] = str_replace('"','\"',$page_projects[0]['description']);
      $proj = '{"projects":['.json_encode($page_projects).']}';
      break;
    case 'papers':
      $proj = htmlspecialchars_decode('{"papers":['.json_encode($page_projects).']}');
      break;
    case 'teams':
      $proj = htmlspecialchars_decode('{"teams":['.json_encode($page_projects).']}');
      break;
    // default:
    //   // code...
    //   break;
  }

  if (!isset($proj)) {
    switch ($dbname) {
      case 'projects':
        $proj ='{"projects":null}';
        break;
      case 'papers':
        $proj ='{"papers":null}';
        break;
      case 'teams':
        $proj ='{"teams":null}';
        break;
    }
  }
  return $proj;
}
?>
