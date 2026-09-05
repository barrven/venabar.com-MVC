<?php
    // load the data and delete the line from the array 
    $filename = 'data/customWords.csv';
    $lines = file($filename);
    $last = sizeof($lines) - 1;
    $removed = $lines[$last];
    unset($lines[$last]);

    // write the new data to the file 
    $fp = fopen($filename, 'w');
    fwrite($fp, implode('', $lines));
    fclose($fp);

    echo json_encode(array("msg" => "$removed"));
?>