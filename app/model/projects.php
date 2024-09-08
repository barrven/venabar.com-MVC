<?php
$json_data = file_get_contents('assets/projects.json');
$data = json_decode($json_data, true); // Decode the JSON data into a PHP array
$projects = $data['projects'];
/***** format *****:
[
    {
        "title":"",
        "description":"",
        "url":"",
        "source":""
    },
    ...
]
*/
// var_dump($projects[0]['title']);

$row = 0;
function isEven($n){
    return $n%2 == 0;
}