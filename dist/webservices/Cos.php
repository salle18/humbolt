<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

echo $params[0] * cos($params[1] * $inputs[0] + $params[2]);