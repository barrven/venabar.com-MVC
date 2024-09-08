<?php

require APP.DS.'connections'.DS.'chatGPT.php';

$data = [
    // 'model' => 'gpt-3.5-turbo',
    'model' => 'gpt-4o-mini',
    'messages' => [
        ['role' => 'system', 'content' => 'You are the best comedian in the world!'],
        ['role' => 'user', 'content' => 'Tell me a joke.']
    ],
    'max_tokens' => 100,
];

$temp = callAPI($data, 'raw');

if(isset($temp['error'])){
    $response = $temp['error'];
} else {
    $response = $temp['choices'][0]['message']['content'];
}

