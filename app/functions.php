<?php

function getParam($name, $default = '')
{
    if (isset($_REQUEST[$name])) {
        return $_REQUEST[$name];
    }
    
    return $default;
}