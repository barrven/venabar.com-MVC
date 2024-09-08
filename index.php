<?php

const DS = DIRECTORY_SEPARATOR;
define('APP',realpath(dirname(__FILE__).DS.'app'));
session_start();
require APP.DS.'config.php';
require APP.DS.'functions.php';

loadEnv(APP.DS.'.env');

$page = getParam('page', 'home'); //default is home
$model = $paths['MODEL'].DS.$page.'.php';
$view = $paths['VIEW'].DS.$page.'.phtml';

if (file_exists($model)) {
    require $model;
}

if (!file_exists($view)) {
    $view = $paths['VIEW'].DS.'components'.DS.'404.phtml';
}

require $paths['VIEW'].DS.'components'.DS.'layout.phtml';