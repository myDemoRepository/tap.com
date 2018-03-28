<?php

class IndexController extends Zend_Controller_Action
{

    public function indexAction()
    {
        $badDomains = new Application_Model_BadDomains();
        $this->view->badDomainsList = $badDomains->getDomains();
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

