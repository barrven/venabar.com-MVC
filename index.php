<?php

// const DS = DIRECTORY_SEPARATOR;
define('APP',realpath(dirname(__FILE__).'/app'));
session_start();
require APP.'/config.php';
require APP.'/functions.php';

loadEnv(APP.'/.env');

$page = getParam('page', 'home'); //default is home
$model = $paths['MODEL']."/$page.php";
$view = $paths['VIEW']."/$page.phtml";

$mode = getParam('mode');
if($mode == 'api'){
    
    if(file_exists($model)){
        require $model;
    }
    
    exit();
}

if (file_exists($model)) {
    require $model;
}

if (!file_exists($view)) {
    $view = $paths['VIEW'].'/components/404.phtml';
}

require $paths['VIEW'].'/components/layout.phtml';