<?php

function getParam($name, $default = '')
{
    if (isset($_REQUEST[$name])) {
        return $_REQUEST[$name];
    }
    
    return $default;
}

function loadEnv($filePath) {
    if (!file_exists($filePath)) {
        throw new Exception(".env file not found");
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);

        putenv(sprintf('%s=%s', $name, $value));
        // if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
        //     putenv(sprintf('%s=%s', $name, $value));
        //     $_ENV[$name] = $value;
        //     $_SERVER[$name] = $value;
        // }
    }
}

function writeJsonToFile($phpAssocArray, $filePath) {
    $currentDateTime = date('Y-d-m H:i:s');
    $phpAssocArray['timeStamp'] = "$currentDateTime";
    $jsonString = json_encode($phpAssocArray, JSON_PRETTY_PRINT);

    // Will append to the file
    if (file_put_contents($filePath, $jsonString.PHP_EOL, FILE_APPEND) === false) {
        return false;
    }

    return true;
}