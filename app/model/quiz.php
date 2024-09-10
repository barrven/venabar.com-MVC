<?php

$courseFiles = glob(APP.DS.'data'.DS.'quiz'.DS.'courses'.DS.'*.json');

$courseList = [];
if ($courseFiles === false) {
    echo "Error accessing folder.";
} else {
    foreach ($courseFiles as $file) {
        // echo basename($file) . "<br>";
        $json = file_get_contents('app/data/quiz/courses/'.basename($file));
        $converted = json_decode($json, true);
        $temp = array(
            "name" => $converted['name'],
            "filename" => basename($file),
            "folder" => $converted['folder'],
            "description" => $converted['description'],
            "sections" => $converted['sections']
        );
        array_push($courseList, $temp);
    }
}

// echo "<br><br><br><br><br>";

$courseListJson = json_encode($courseList);