<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

$check = $params[1] * $inputs[0] + $params[2];

if ($check > 0) {
    echo $params[0] * atan($check);
} else {
    http_response_code(400);
    echo "Vrednost za ArcTan je negativna.";
}