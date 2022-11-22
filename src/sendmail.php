<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);


$mail->setFrom('from@example.com', 'Mailer');
$mail->addAddress('severals.gm@gmail.com', 'Joe User');
$mail->Subject = 'Here is the subject';

$body = '';

if(trim(!empty($_POST['company_name']))) {
    $body.= 'Наименование компании' . $_POST['company_name'];
};

if(trim(!empty($_POST['user_name']))) {
    $body.= 'ФИО' . $_POST['user_name'];
};

if(trim(!empty($_POST['phone']))) {
    $body.= 'Телефон' . $_POST['phone'];
};

if(trim(!empty($_POST['email']))) {
    $body.= 'Email' . $_POST['email'];
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
