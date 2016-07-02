<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

if ($inputs[1] === 0) {
    http_response_code(400);
    echo "Divider nedozvoljeno deljenje nulom.";
}
echo $inputs[0] / $inputs[1];