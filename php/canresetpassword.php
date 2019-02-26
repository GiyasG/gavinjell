<?php

$sl = $_GET['selector'];
$tk = $_GET['token'];

require '../vendor/autoload.php';

if (isset($sl)) {
  $db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db);
  $outp = "";
  try {
      $auth->canResetPasswordOrThrow($sl, $tk);
      $outp ='{"info":[{"ConfirmationStatus":"Please enter a new valid password", "isEmailConfirmed":true}]}';
    }

  catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
    $outp ='{"info":[{"ConfirmationStatus":"Invalid token", "isEmailConfirmed":false}]}';
  }
  catch (\Delight\Auth\TokenExpiredException $e) {
    $outp ='{"info":[{"ConfirmationStatus":"Token expired", "isEmailConfirmed":false}]}';
  }
  catch (\Delight\Auth\ResetDisabledException $e) {
    $outp ='{"info":[{"ConfirmationStatus":"Password reset is disabled", "isEmailConfirmed":false}]}';
  }
  catch (\Delight\Auth\TooManyRequestsException $e) {
    $outp ='{"info":[{"ConfirmationStatus":"Too many requests", "isEmailConfirmed":false}]}';
  }
}
echo ($outp);
?>
