<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);
$time = floatval($_GET['time']);
echo $time;