<?php

// const DS = DIRECTORY_SEPARATOR;
define('ROOT', realpath(dirname(__FILE__).'/..'));
define('APP', ROOT.'/app');
define('PUBLIC_PATH', ROOT.'/public');
session_start();
require ROOT.'/config.php';
require APP.'/functions.php';

loadEnv(ROOT.'/.env');

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
