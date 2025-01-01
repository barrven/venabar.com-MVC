<?php
header('Content-Type: application/json');
require APP.DS.'connections'.DS.'chatGPT.php';


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Only POST method is allowed."]);
    exit();
}

$postData = json_decode(file_get_contents('php://input'), true);

// writeJsonToFile($postData['history'], 'app/logs/get-quiz-log.txt');

// Validate POST data
// if (!isset($postData['history']) || empty($postData['history'])) {
//     http_response_code(400); // Bad Request
//     echo json_encode(["error" => "No history object was passed."]); //todo: log errors
//     exit();
// }

//parse url into its components: path, query 
$urlComponents = parse_url($_SERVER['REQUEST_URI']);

//extract url arguments in to array
parse_str($urlComponents['query'], $urlArgs);
$course = $urlArgs['course'];
$detail = $urlArgs['detail'];
$file = explode(".", $detail)[0];
$section = $urlArgs['section'];

$basePath = 'app/data/quiz';

$srcData = file_get_contents("$basePath/courses/$course/$file.txt");
$sysPrompt = file_get_contents("$basePath/quizPrompt.txt");
$schema = file_get_contents("$basePath/responseSchema.json");

$sysPrompt .= "\n<course>$course</course>\n";
// $sysPrompt .= "<description></description>\n";
$sysPrompt .= "<section>$section</section>\n";
$sysPrompt .= "<detail>$detail</detail>\n";
$sysPrompt .= "<transcript>$srcData</transcript>";

// writeJsonToFile(["sysPrompt"=> $sysPrompt], 'app/logs/get-quiz-log.txt');

if(count($postData) == 0){
    $userMessage = 'Begin!';
} else {
    //format the user message with the question history to avoid duplicate questions.
    $userMessage = "Here is a history of the questions you have asked so far:\<history>";
    foreach($postData['history'] as $i){
        $userMessage .= "<q>$i</q>";
    }
    $userMessage .= "</history>Do not repeat any of the questions listed in the history. Please ask a new question.";
}

$data = [
    'model' => 'gpt-4o-mini',
    'messages' => [
        ['role' => 'system', 'content' => $sysPrompt],
        ['role' => 'user', 'content' => $userMessage]
    ],
    'max_tokens' => 10000,
    'response_format' => [
        "type" => "json_schema",
        "json_schema" => json_decode($schema, true)
    ]
];

// $temp = callAPI($data, 'raw');

//temp file for testing without calling api
$temp = file_get_contents("$basePath/exampleRes.json");

if(isset($temp['error'])){
    $response = json_encode($temp);
} else {

    // $response = $temp['choices'][0]['message']['content'];
    $response = $temp;
}

http_response_code(200);
//doesn't need the json_encode function if reading direct from the json file
// or from the api response
echo $response;