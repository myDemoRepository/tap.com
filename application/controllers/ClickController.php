<?php

class ClickController extends Zend_Controller_Action
{

    public function indexAction()
    {
        $userAgent = new Zend_Http_UserAgent();
        $userAgent = $userAgent->getUserAgent();

        $ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
        $referrer = filter_input(INPUT_SERVER, 'HTTP_REFERER');
        $param1 = $this->getRequest()->getParam('param1');
        $param2 = ($this->getRequest()->getParam('param2')) ? $this->getRequest()->getParam('param2') : '';

        $params = [
            'ua' => $userAgent,
            'ip' => $ip,
            'referrer' => $referrer,
            'param1' => $param1,
            'param2' => $param2,
        ];
        $clickModel = new Application_Model_Click();
        $clickModel->setParams($params);
        $url = $clickModel->getRedirectUrlAndSetClickParams();

        $this->_helper->getHelper('Redirector')->gotoUrl($url);
    }

    /**
     * Get all records
     */
    public function getallrecordsAction()
    {
        $current = $this->getRequest()->getParam('current');
        $rowCount = $this->getRequest()->getParam('rowCount');
        $order = $this->getRequest()->getParam('sort');
        $searchPhrase = $this->getRequest()->getParam('searchPhrase');

        $clickModel = new Application_Model_Click();
        $jsonRes = $clickModel->getData($order, $searchPhrase);

        $jsonRes = [
            "current" => $current,
            "rowCount" => $rowCount,
            "total" => count($jsonRes),
            "rows" => $jsonRes,
        ];

        die(json_encode($jsonRes));
    }

    /**
     * Success action
     */
    public function successAction()
    {
        $id = $this->getRequest()->getParam('id');
        $clickModel = new Application_Model_Click();
        $result = $clickModel->getClickInfoById($id);
        $this->view->data = $result;
    }

    /**
     * Error action
     */
    public function errorAction()
    {
        $clickModel = new Application_Model_Click();

        $id = $this->getRequest()->getParam('id');
        $result = $clickModel->getClickInfoById($id);
        $this->view->data = $result;
        $this->view->redirect = $clickModel->getRedirectValue();
    }
}