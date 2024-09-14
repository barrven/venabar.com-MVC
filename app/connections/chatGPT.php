<?php

function callAPI($data, $resFormat='message'){
    $curl = curl_init();
    $apiKey = getenv('OPENAI_API_KEY');
    $url = "https://api.openai.com/v1/chat/completions";

    $headers = [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey"
    ];

    // writeJsonToFile($data, 'app/logs/chatGPT-log.txt');
    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => json_encode($data)
    ]);

    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_errno($curl);
    curl_close($curl);

    if($error) {
        return ["error"=> '**Curl Error**: '];
    }

    if($httpCode != 200){
        return ["error"=> 'The request failed with error code: '.$httpCode];
    }

    // ****** response format ***** :
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
    
    $temp = json_decode($response, true);
    if($resFormat == 'message'){
        return $temp['choices'][0]['message']['content'];
    }

    if($resFormat == 'raw'){
        return $temp;
    }

}
