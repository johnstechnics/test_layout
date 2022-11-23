<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->isSMTP();
$mail->Host       = 'smtp.example.com';
$mail->SMTPAuth   = true;
$mail->Username   = 'username';
$mail->Password   = 'password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->Port       = 465;

$mail->setFrom('from@example.com', 'Mailer');
$mail->addAddress('to@example.com', 'User');
$mail->Subject = 'Here is the subject';

$body = '';

if(trim(!empty($_POST['company_name']))) {
    $body.= 'Наименование компании' . $_POST['company_name'] . '<br>';
};

if(trim(!empty($_POST['user_name']))) {
    $body.= 'ФИО' . $_POST['user_name'] . '<br>';
};

if(trim(!empty($_POST['phone']))) {
    $body.= 'Телефон' . $_POST['phone'] . '<br>';
};

if(trim(!empty($_POST['email']))) {
    $body.= 'Email' . $_POST['email'] . '<br>';
};

$mail->Body = $body;

if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
};

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
