<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

if ($inputs[0] > $params[0] && $inputs[0] < $params[1]) {
    echo 0;
} else {
    echo $inputs[0];
}