<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

echo $params[0] * $inputs[0] + $params[1] * $inputs[1] + $params[2] * $inputs[2];