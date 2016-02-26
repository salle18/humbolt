<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

if ($inputs[1] < $inputs[0]) {
    http_response_code(400);
    echo "Simulacija završena.";
}