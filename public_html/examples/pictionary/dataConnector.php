<?php
    $easy = convertToJson(file('data/easyWords.csv'));
    $medium = convertToJson(file('data/mediumWords.csv'));
    $hard = convertToJson(file('data/hardWords.csv'));
    $custom = convertToJson(file('data/customWords.csv'));

    function convertToJson($arr){
        $temp = "";
        foreach($arr as $line){
            $line = trim($line);
            $temp .= "'$line',";
        }
        return substr($temp, 0, -1);
    }

?>