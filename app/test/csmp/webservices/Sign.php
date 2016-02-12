<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

if ($inputs[0] > 0) {
    echo 1;
} else if ($inputs[0] < 0) {
    echo -1;
} else {
    echo 0;
}