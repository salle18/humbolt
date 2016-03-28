<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

echo $params[0] * exp($params[1] * $inputs[0] + $params[2]);