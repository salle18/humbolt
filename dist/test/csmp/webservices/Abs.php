<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

echo abs($inputs[0]);