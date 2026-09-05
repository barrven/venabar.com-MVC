<?php
    if (isset($_POST['newWord'])) {
        $word = $_POST['newWord'];
        
        if(isDuplicate($word)){
            //returns result to the calling page
            echo json_encode(array(
                'success'=> false,
                'word'=> $word, 
                'msg'=> 'Error, this entry is already on the list',
                'resCode'=> 'duplicate_entry'
            ));
            exit();
        }

        if(!isAlphanumeric($word)){
            //returns result to the calling page
            echo json_encode(array(
                'success' => false,
                'word' => $word,
                'msg' => 'Error, only letters, numbers, and spaces are allowed.',
                'resCode' => 'illegal_chars'
            ));
            exit();
        }
        
        $fp = fopen('data/customWords.csv', 'a'); //opens file in append mode  
        fwrite($fp, "$word\r\n");
        fclose($fp);

        //returns result to the calling page
        echo json_encode(array('success'=>true, 'word'=>$word));
    }

    function isDuplicate($word){
        $file = 'data/customWords.csv';
        $lines = file($file);
        foreach($lines as $line){
            if(trim($line) == $word){
                return true;
            }
        }
        return false;
    }

    function isAlphanumeric($word){
        return preg_match('/^[a-z0-9\040]+$/i', $word);
    }

?>