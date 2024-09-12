<?php
// require APP.DS.'connections'.DS.'chatGPT.php';
// // echo "<br><br><br><br>";

// //parse url into its components: path, query 
// $urlComponents = parse_url($_SERVER['REQUEST_URI']);

// //extract url arguments in to array
// parse_str($urlComponents['query'], $urlArgs);
// $course = $urlArgs['course'];
// $file = $urlArgs['detail'];
// $file = explode(".", $file)[0];
// // var_dump($file);

// $basePath = 'app/data/quiz';

// $srcData = file_get_contents("$basePath/courses/$course/$file.txt");
// // $courseInfo = file_get_contents("$basePath/courses/$course.json");
// $sysPrompt = file_get_contents("$basePath/quizPrompt.txt");
// $schema = file_get_contents("$basePath/responseSchema.json");

// $sysPrompt .= "\n<course>$course</course>\n";
// $sysPrompt .= "<description></description>\n";
// $sysPrompt .= "<transcript>$srcData</transcript>";

// $data = [
//     'model' => 'gpt-4o-mini',
//     'messages' => [
//         ['role' => 'system', 'content' => $sysPrompt],
//         ['role' => 'user', 'content' => 'Begin!']
//     ],
//     'max_tokens' => 800,
//     'response_format' => [
//         "type" => "json_schema",
//         "json_schema" => json_decode($schema, true)
//     ]
// ];

// $temp = callAPI($data, 'raw');

// //temp file for testing without calling api
// // $temp = file_get_contents("$basePath/exampleRes.json");

// if(isset($temp['error'])){
//     $response = json_encode($temp);
// } else {

//     $response = $temp['choices'][0]['message']['content'];
//     // $response = $temp;
// }
