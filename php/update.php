<?php
require '../vendor/autoload.php';
  $db1 = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db1);
$outp3 = "";
if (($auth->isLoggedIn()) && ($auth->hasRole(\Delight\Auth\Role::ADMIN))) {
  $outp3 = '{"AdminIsIn":true}';
  $adminOk = true;
} else {
  $outp3 = '{"AdminIsIn":false}';
  $adminOk = false;
}

if ($adminOk) {
  // print_r($_POST['item']);
  if (isset($_POST['item'])) {
    $items = $_POST['item'];
    // print_r($items);
    // print_r($_FILES['file']);
  }
  if(isset($_FILES['file'])){
      $errors= array();
      $file_name = $_FILES['file']['name'];
      $file_size =$_FILES['file']['size'];
      $file_tmp =$_FILES['file']['tmp_name'];
      $file_type=$_FILES['file']['type'];
      $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
      $extensions = array("jpeg","jpg","png","pdf");
      if(in_array($file_ext,$extensions )=== false){
           $errors[]="File extension not allowed, please choose a JPEG or PNG file.";
      }
      if($file_size > 1097152){
          $errors[]='File size cannot exceed 1 MB';
      }
      if(file_exists('../img/'.$file_name)) {
        $errors[]='File '.$file_name.' already exists';
      }
      if(empty($errors)==true){
          $currentDate = date('ymdhms');
          $newFileName = $currentDate.$file_name;
          move_uploaded_file($file_tmp,"../img/".$newFileName);
          $rid = toDbase($items, $newFileName);

          $items['image'] = '../img/'.$newFileName;
          $outp2 = '{"message": "The record and the image updated successfully"}';
          $outp1 = '{"updateitem":['.json_encode($items).']}';
          $outp  = '{"info":['.$outp1.','.$outp2.','.$outp3.']}';

          echo ($outp);
      }else{
          print_r($errors[0]);
      }
  }
  else{
    $newFileName = $items['image'];
    toDbase($items, $newFileName);

    $outp2 = '{"message": "The record updated with the current image successfully"}';
    $outp1 = '{"updateitem":['.json_encode($items).']}';
    $outp  = '{"info":['.$outp1.','.$outp2.','.$outp3.']}';

    echo ($outp);
  }

} else {
  $outp2 = '{"message": "null"}';
  $outp1 = '{"updateitem":"null"}';
  $outp  = '{"info":['.$outp1.','.$outp2.','.$outp3.']}';
}

//********************************************************************//
function toDbase($items, $newFileName) {
  include('class/mysql_crud.php');
  $db = new Database();
	$db->connect();
	$db->setName('SET NAMES \'utf8\'');


$db->update('stock',array('id'=>$items['id'],'sname'=>$items['name'],
'simage'=>$newFileName, 'sdescription'=>$items['description'],'sprice'=>$items['price'],
's39_all'=>$items['size39all'], 's39_reserved'=>$items['size39reserved'],
's39_forsale'=>$items['size39forsale'], 's39_sold'=>$items['size39sold'],
's40_all'=>$items['size40all'], 's40_reserved'=>$items['size40reserved'],
's40_forsale'=>$items['size40forsale'], 's40_sold'=>$items['size40sold'],
's41_all'=>$items['size41all'], 's41_reserved'=>$items['size41reserved'],
's41_forsale'=>$items['size41forsale'], 's41_sold'=>$items['size41sold'],
's42_all'=>$items['size42all'], 's42_reserved'=>$items['size42reserved'],
's42_forsale'=>$items['size42forsale'], 's42_sold'=>$items['size42sold'],
's43_all'=>$items['size43all'], 's43_reserved'=>$items['size43reserved'],
's43_forsale'=>$items['size43forsale'], 's43_sold'=>$items['size43sold'],
's44_all'=>$items['size44all'], 's44_reserved'=>$items['size44reserved'],
's44_forsale'=>$items['size44forsale'], 's44_sold'=>$items['size44sold'],
's45_all'=>$items['size45all'], 's45_reserved'=>$items['size45reserved'],
's45_forsale'=>$items['size45forsale'], 's45_sold'=>$items['size45sold']),
'id=\''.$items['id'].'\'');

			$res = $db->getResult();
			if (!$res)
			{
        echo "ERROR";
			die('Cant connect1: ' . mysql_error());
			}

$db->disconnect();
}


?>
