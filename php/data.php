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

    foreach ($res as $key1 => $value1) {
      $res_joint = $tb->get_JointResult('teams', 'projects_team', 'projects', $res[$key1]['id']);
      if ($res_joint) {
        foreach ($res_joint as $key2 => $value2) {
          $res[$key1]['author'][$key2]['team_id'] = $res_joint[$key2]['team_id'];
          $res[$key1]['author'][$key2]['name'] = $res_joint[$key2]['name'];
          $res[$key1]['author'][$key2]['title'] = $res_joint[$key2]['titlet'];
          $res[$key1]['author'][$key2]['surname'] = $res_joint[$key2]['surname'];
        }
      }
    }
  $records_number  = sizeof($res);
  $records_per_page = 3;

  for ($i=0; $i < $records_number; $i++) {
      $res[$i]['about'] = html_entity_decode($res[$i]['about']);
      $res[$i]['about'] = str_replace('"','\"',$res[$i]['about']);
      $res[$i]['description'] = html_entity_decode($res[$i]['description']);
      $res[$i]['description'] = str_replace('"','\"',$res[$i]['description']);
  }

  if ($choosendb == "projects" && $records_number != 0) {
    $proj = Projects("projects", $db, $res, $records_number, $records_per_page);
  }  elseif ($choosendb == "admin" && $records_number != 0) {
    $records_per_page = $records_number;
    $proj = Projects("projects",$db, $res, $records_number, $records_per_page);
  } elseif ($choosendb != "projects" && $choosendb != "admin" || $records_number == 0) {
    $proj ='{"projects":null}';
  }

/* Publications */

$res = $tb->get_ParentResult('authority', 'papers');

foreach ($res as $key1 => $value1) {
  $res_joint = $tb->get_JointResult('teams', 'papers_team', 'papers', $res[$key1]['id']);
  if ($res_joint) {
    foreach ($res_joint as $key2 => $value2) {
      $res[$key1]['author'][$key2]['team_id'] = $res_joint[$key2]['team_id'];
      $res[$key1]['author'][$key2]['name'] = $res_joint[$key2]['name'];
      $res[$key1]['author'][$key2]['title'] = $res_joint[$key2]['titlet'];
      $res[$key1]['author'][$key2]['surname'] = $res_joint[$key2]['surname'];
    }
  }
}

$records_number  = sizeof($res);
$records_per_page = 3;

for ($i=0; $i < $records_number; $i++) {
    $res[$i]['about'] = html_entity_decode($res[$i]['about']);
    $res[$i]['about'] = str_replace('"','\"',$res[$i]['about']);
    $res[$i]['description'] = html_entity_decode($res[$i]['description']);
    $res[$i]['description'] = str_replace('"','\"',$res[$i]['description']);
}

if ($choosendb == "papers" && $records_number != 0) {
  $papr = Projects("papers", $db, $res, $records_number, $records_per_page);
}  elseif ($choosendb == "admin" && $records_number != 0) {
  $records_per_page = $records_number;
  $papr = Projects("papers",$db, $res, $records_number, $records_per_page);
} elseif ($choosendb != "papers" && $choosendb != "admin" || $records_number == 0) {
  $papr ='{"papers":null}';
}

/* TEAMS */

$res = $tb->get_ParentResult('authority', 'teams');

foreach ($res as $key1 => $value1) {
  $res_contact = $tb->get_JointResult('tcontacts', 'contacts_team', 'teams', $res[$key1]['id']);
  // print_r ($res_joint);
  if ($res_contact) {
    foreach ($res_contact as $key2 => $value2) {
      // echo $key2;
      // print_r ($value2);
      $res[$key1]['contact'][$key2]['id'] = $res_contact[$key2]['tcontact_id'];
      $res[$key1]['contact'][$key2]['country'] = $res_contact[$key2]['country'];
      $res[$key1]['contact'][$key2]['city'] = $res_contact[$key2]['city'];
      $res[$key1]['contact'][$key2]['street'] = $res_contact[$key2]['street'];
      $res[$key1]['contact'][$key2]['postcode'] = $res_contact[$key2]['postcode'];
      $res[$key1]['contact'][$key2]['phone'] = $res_contact[$key2]['phone'];
      $res[$key1]['contact'][$key2]['email'] = $res_contact[$key2]['email'];
    }
  }
}
foreach ($res as $key1 => $value1) {
  $res_project = $tb->get_JointResult('projects', 'projects_team', 'teams', $res[$key1]['id']);
  // print_r ($res_project);
  if ($res_project) {
    foreach ($res_project as $key2 => $value2) {
      $res[$key1]['project'][$key2]['project_id'] = $res_project[$key2]['project_id'];
      $res[$key1]['project'][$key2]['title'] = $res_project[$key2]['title'];
    }
  }
}
foreach ($res as $key1 => $value1) {
  $res_paper = $tb->get_JointResult('papers', 'papers_team', 'teams', $res[$key1]['id']);
  // print_r ($res_paper);
  if ($res_paper) {
    foreach ($res_paper as $key2 => $value2) {
      $res[$key1]['paper'][$key2]['paper_id'] = $res_paper[$key2]['paper_id'];
      $res[$key1]['paper'][$key2]['title'] = $res_paper[$key2]['title'];
    }
  }
}



$records_number  = sizeof($res);
  // print_r ($res);
  // echo "RECORDS number: ".$records_number;
$records_per_page = 3;

for ($i=0; $i < $records_number; $i++) {
    $res[$i]['about'] = html_entity_decode($res[$i]['about']);
    $res[$i]['about'] = str_replace('"','\"',$res[$i]['about']);
    // $res[$i]['description'] = html_entity_decode($res[$i]['description']);
    // $res[$i]['description'] = str_replace('"','\"',$res[$i]['description']);
}

if ($choosendb == "teams" && $records_number != 0) {
  $team = Projects("teams", $db, $res, $records_number, $records_per_page);
  // print_r ($team);
}  elseif ($choosendb == "admin" && $records_number != 0) {
  $records_per_page = $records_number;
  $team = Projects("teams",$db, $res, $records_number, $records_per_page);
} elseif ($choosendb != "teams" && $choosendb != "admin" || $records_number == 0) {
  $team ='{"teams":null}';
}

// ************* Contact ***************** //
if (isset($db)) {
  $tb = new Table();
  $res = $tb->get_ParentResult('authority', 'contacts');

  $cnt ='{"contact":['.json_encode($res).']}';
} else {
  $cnt ='{"contact":["No items found"]}';
}


$outp = '{"items":['.$outp1.','.$proj.','.$papr.','.$team.','.$cnt.','.$outp3.']}';

$db->disconnect();

echo ($outp);
// ************************** //
function Projects($dbname, $db, $res, $records_number, $records_per_page)
{
  $proj = "";
  $whole_pages = floor($records_number/$records_per_page);
  $last_page = $records_number-($whole_pages*$records_per_page);
  // echo "DBname: ".$dbname;
  // echo "Records per page: ".$records_per_page;
  // echo "records number: ".$records_number;
  // echo "whole: ".$whole_pages;
  // echo "last: ".$last_page;
  $pages = $whole_pages + $last_page;
  $page_projects = [];
  $c_page = 0;
  if ($last_page >= 0) {
    for ($l=0; $l <= $whole_pages-1; $l++) {
      for ($i=0; $i < $records_per_page; $i++) {
        $page_projects[$l][$i] = array_shift($res);
        if (isset($page_projects[$l][$i]['about'])) {
          $page_projects[$l][$i]['about'] = html_entity_decode($page_projects[$l][$i]['about']);
          $page_projects[$l][$i]['about'] = str_replace('"','\"',$page_projects[$l][$i]['about']);
        } elseif (isset($page_projects[$l][$i]['description'])) {
          $page_projects[$l][$i]['description'] = html_entity_decode($page_projects[$l][$i]['description']);
          $page_projects[$l][$i]['description'] = str_replace('"','\"',$page_projects[$l][$i]['description']);
        }
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
      $proj = '{"projects":['.json_encode($page_projects).']}';
      break;
    case 'papers':
      $proj = '{"papers":['.json_encode($page_projects).']}';
      break;
    case 'teams':
      $proj = '{"teams":['.json_encode($page_projects).']}';
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
