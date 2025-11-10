<?php

include_once 'Controller.php';
include_once 'Api.php';

if ($_SERVER['REQUEST_URI']) {
    $requestUri = str_replace('/Agile%20TP/Words%20Game/BackEnd/Index.php', '', $_SERVER['REQUEST_URI']);
    $requestUri = strtok($requestUri, '?');
    // echo "Request URI: " . $requestUri . "\n";
    $Api = new Api();
    $Api->handleRequest($requestUri);
}