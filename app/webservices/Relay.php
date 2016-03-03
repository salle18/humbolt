<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

if ($inputs[0] < 0) {
    echo $inputs[2];
} else {
    echo $inputs[1];
}