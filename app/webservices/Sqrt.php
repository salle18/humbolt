<?php

$params = array_map('floatval', $_GET['params']);
$inputs = array_map('floatval', $_GET['inputs']);

if ($inputs[1] < $inputs[0]) {
    http_response_code(400);
    echo "Simulacija završena.";
}

if ($inputs[0] < 0) {
    http_response_code(400);
    echo "Ulaz u kvadratni koren je negativan.";
}
echo sqrt($inputs[0]);
