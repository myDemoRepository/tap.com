<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

    public function _initRoute()
    {
        /* Get default route */
        $router = Zend_Controller_Front::getInstance()->getRouter();

        /* Set action for success requests */
        $routeClickSuccess = new Zend_Controller_Router_Route_Regex(
            'click/success/([a-z0-9-]+)',
            [
                'controller' => 'click',
                'action' => 'success',
            ],
            [
                1 => 'id',
            ]
        );
        $router->addRoute('clickSuccess', $routeClickSuccess);

        /* Set action for error requests */
        $routeClickError = new Zend_Controller_Router_Route_Regex(
            'click/error/([a-z0-9-]+)',
            [
                'controller' => 'click',
                'action' => 'error',
            ],
            [
                1 => 'id',
            ]
        );
        $router->addRoute('clickErorr', $routeClickError);

        /* Set action for POST requests */
        $routeAjax = new Zend_Controller_Router_Route_Regex(
            '(getallrecords)',
            [
                'controller' => 'click',
                'action' => 'getallrecords'
            ]
        );

        $router->addRoute('postsCall', $routeAjax);
    }
}

