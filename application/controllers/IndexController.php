<?php

class IndexController extends Zend_Controller_Action
{

    public function indexAction()
    {
        $badDomains = new Application_Model_BadDomains();
        $this->view->badDomainsList = $badDomains->getDomains();
        $this->view->currentDomain = filter_input(INPUT_SERVER, 'SERVER_NAME');
    }

    /**
     * Add new domain
     */
    public function adddomainAction()
    {
        $domainName = $this->getRequest()->getParam('domain');

        $clickModel = new Application_Model_BadDomains();
        $result = $clickModel->addDomain($domainName);

        die(json_encode($result));
    }
}

