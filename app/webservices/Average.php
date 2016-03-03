<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);
$connections = array_map('intval', $_GET['connections']);

$filtered = array_intersect_key($inputs, array_flip($connections));

if (count($filtered) > 0) {
	echo array_sum($filtered) / count($filtered);
} else {
	echo 0;
}