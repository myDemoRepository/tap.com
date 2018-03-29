<?php

// Define path to root directory
defined('ROOT_PATH')
|| define('ROOT_PATH', realpath(dirname(__FILE__) . '/..'));
// Define path to application directory
defined('APPLICATION_PATH')
|| define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

// Define application environment
defined('APPLICATION_ENV')
|| define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'testing'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, [
realpath(APPLICATION_PATH . '/../library'),
get_include_path(),
]));

/** Zend_Application */
require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
APPLICATION_ENV,
APPLICATION_PATH . '/configs/application.ini'
);
