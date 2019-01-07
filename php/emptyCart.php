<?php
session_start();
  $_SESSION['cart'] =array();
  unset($_SESSION['cart']);
  $outp ='{"cart":null}';
echo ($outp);
?>
