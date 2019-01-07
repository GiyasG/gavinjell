<?php
  session_start();
  // $bsk = $_GET['items'];
  // $outp = "";
  // $outp ='{"basketitems":'.$bsk.'}';
  // echo ($outp);

  if (isset($_SESSION['cart'])) {
    // var_dump($_SESSION);
    $outp2 = "";
    foreach ($_SESSION['cart'] as $rs) {
        if ($outp2 != "") {$outp2 .= ",";}
        $outp2 .= '{"name":"'.$rs["sname"].'",';
        $outp2 .= '"description":"'.$rs["sdescription"].'",';
        $outp2 .= '"price":"'.$rs["sprice"].'",';
        $outp2 .= '"size":"'.$rs["size"].'",';
        $outp2 .= '"quantity":"'.$rs["quantity"].'",';
        $outp2 .= '"image":"'.$rs["simage"].'"}';
    }
    $outp2 ='{"cart":['.$outp2.']}';
  } else {
    // var_dump($_SESSION);
    $outp2 = '{"cart": null}';
  }

echo ($outp2);
?>
