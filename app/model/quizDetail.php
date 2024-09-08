<?php
require APP.DS.'connections'.DS.'chatGPT.php';
echo "<br><br>";

//parse url into its components: path, query 
$urlComponents = parse_url($_SERVER['REQUEST_URI']);

//extract url arguments in to array
parse_str($urlComponents['query'], $urlArgs);
$course = $urlArgs['course'];
$file = $urlArgs['detail'];

$basePath = 'app/data/quiz';
// $srcDataFilePath = APP.DS.'data'.DS.'quiz'.DS.'courses'.DS.$course.DS.$file.'.txt';
$srcData = file_get_contents("$basePath/courses/$course/$file.txt");
// $courseInfo = file_get_contents("$basePath/courses/$course.json");

$sysPrompt = file_get_contents("$basePath/quizPrompt.txt");
$schema = file_get_contents("$basePath/responseSchema.json");

$sysPrompt .= "\n<course>$course</course>\n";
$sysPrompt .= "<description></description>\n";
$sysPrompt .= "<transcript>$srcData</transcript>";

$data = [
    'model' => 'gpt-4o-mini',
    'messages' => [
        ['role' => 'system', 'content' => $sysPrompt],
        ['role' => 'user', 'content' => 'Begin!']
    ],
    'max_tokens' => 800,
    'response_format' => [
        "type" => "json_schema",
        "json_schema" => json_decode($schema, true)
    ]
];

$temp = callAPI($data, 'raw');

if(isset($temp['error'])){
    $response = json_encode($temp);
} else {

    $response = $temp['choices'][0]['message']['content'];
}
