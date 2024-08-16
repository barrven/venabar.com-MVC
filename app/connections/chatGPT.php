<?php

function callAPI($data){

    $apiKey = getenv('OPENAI_API_KEY');
    $url = "https://api.openai.com/v1/chat/completions";

    $headers = [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey"
    ];

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);

    if(curl_errno($ch)) {

        // echo "----Error---<br>";
        $output = curl_error($ch);

    } else {
        
        // echo "----no error---<br>";
        $temp = json_decode($response, true);
        // var_dump($temp);
        // ****** format ***** :
        // array(
        //     "id" => "chatcmpl-9wxk3eAoGlZDEX9E3GLpXRJ1N1DBp",
        //     "object" => "chat.completion",
        //     "created" => 1723839699,
        //     "model" => "gpt-3.5-turbo-0125",
        //     "choices" => array(
        //         array(
        //             "index" => 0,
        //             "message" => array(
        //                 "role" => "assistant",
        //                 "content" => "Sure! Here's a joke for you: Why don't scientists trust atoms? Because they make up everything!",
        //                 "refusal" => NULL
        //             ),
        //             "logprobs" => NULL,
        //             "finish_reason" => "stop"
        //         )
        //     ),
        //     "usage" => array(
        //         "prompt_tokens" => 22,
        //         "completion_tokens" => 22,
        //         "total_tokens" => 44
        //     ),
        //     "system_fingerprint" => NULL
        // );
        $output = $temp['choices'][0]['message']['content'];
    }

    curl_close($ch);
    return $output;
}
