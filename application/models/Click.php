<?php

class Application_Model_Click
{
    /**
     * @var string User agent
     */
    protected $userAgent;

    /**
     * @var string Ip address
     */
    protected $ip;

    /**
     * @var string Referrer url
     */
    protected $referrer;

    /**
     * @var string $param1 Url param
     */
    protected $param1;

    /**
     * @var string $param1 Url param
     */
    protected $param2;

    /**
     * @var string Table name
     */
    protected $tableName = 'click';


    /**
     * Get redirect value
     *
     * @return bool True if redirect enabled false otherwise
     */
    public function getRedirectValue()
    {
        $result = false;
        $namespace = new Zend_Session_Namespace("redirectToGoogle");
        if ($namespace->redirect) {
            $result = $namespace->redirect;
            $namespace->redirect = false;
        }

        return $result;
    }

    /**
     * Get redirect url and set click params
     *
     */
    public function getRedirectUrlAndSetClickParams()
    {
        $newClick = true;

        $id = $this->getClickId();
        $clickData = $this->getClickInfoById($id);

        $error = 0;
        $badDomain = 0;

        if (is_array($clickData) && !empty($clickData)) {
            if ($id == $clickData['id']) {
                $newClick = false;
                $error = $clickData['error'] + 1;
                $badDomain = $clickData['bad_domain'];
            }
        }

        if ($badDomain) {
            $domainExists = true;
        } else {
            $domainReferrer = $this->getReferrer();
            $domains = new Application_Model_BadDomains();
            $domainExists = $domains->checkIsDomainsExistsByReferrer($domainReferrer);
        }

        $where = ['id = ?' => $id];
        try {
            if ($newClick) {
                $clickParams = $this->getCommonClickParams();
                $clickParams['id'] = $id;

                if ($domainExists) {
                    $data['error'] = 1;
                    $data['bad_domain'] = 1;

                    $namespace = new Zend_Session_Namespace("redirectToGoogle");
                    $namespace->redirect = true;

                    $url = 'click/error/' . $id;
                } else {
                    $url = 'click/success/' . $id;
                }

                $this->insertClickInfo($clickParams);
            } else {
                if ($domainExists) {
                    $clickParams = [
                        'error' => $error,
                        'bad_domain' => 1,
                    ];
                    $this->updateClickInfo($clickParams, $where);

                    $namespace = new Zend_Session_Namespace("redirectToGoogle");
                    $namespace->redirect = true;
                } else {
                    $clickParams = [
                        'error' => $error,
                    ];
                    $this->updateClickInfo($clickParams, $where);
                }
                $url = 'click/error/' . $id;
            }
        } catch (Exception $e) {
            $url = 'error';
        }

        return $url;
    }

    /**
     * Set params
     *
     * @param array $params Params list
     */
    public function setParams($params)
    {
        $userAgent = isset($params['ua']) ? $params['ua'] : null;
        $ip = isset($params['ip']) ? $params['ip'] : null;
        $rawReferrer = isset($params['referrer']) ? $params['referrer'] : null;
        $referrer = $this->getDomainNameFromReferrer($rawReferrer);
        $param1 = isset($params['param1']) ? $params['param1'] : null;
        $param2 = isset($params['param2']) ? $params['param2'] : null;

        $this->setUserAgent($userAgent);
        $this->setIp($ip);
        $this->setReferrer($referrer);
        $this->setParam1($param1);
        $this->setParam2($param2);
    }

    /**
     * Get data list
     *
     * @param string $order
     * @param string $searchPhrase
     *
     * @return array
     */
    public function getData($order, $searchPhrase)
    {
        $orderStr = '';
        if (isset($order) && is_array($order)) {
            $keyArray = array_keys($order);
            $fieldName = $keyArray[0];
            $fieldValue = $order[$fieldName];
            $orderStr = sprintf('ORDER BY %s %s', $fieldName, $fieldValue);
        }

        $searchStr = '';
        if ($searchPhrase) {
            $searchStr = 'WHERE ';
            $searchStr .= sprintf("(`id` LIKE '%%%s%%') OR ", $searchPhrase);
            $searchStr .= sprintf("(`ua` LIKE '%%%s%%') OR ", $searchPhrase);
            $searchStr .= sprintf("(`ip` LIKE '%%%s%%') OR ", $searchPhrase);
            $searchStr .= sprintf("(`ref` LIKE '%%%s%%') OR ", $searchPhrase);
            $searchStr .= sprintf("(`param1` LIKE '%%%s%%') OR ", $searchPhrase);
            $searchStr .= sprintf("(`param2` LIKE '%%%s%%') OR ", $searchPhrase);
            $searchStr .= sprintf("(`error` LIKE '%%%s%%') OR ", $searchPhrase);
            $searchStr .= sprintf("(`bad_domain` LIKE '%%%s%%')", $searchPhrase);
        }

        $dbAdapter = Zend_Db_Table::getDefaultAdapter();
        $sql = sprintf("SELECT * FROM `click` %s %s", $searchStr, $orderStr);
        $clickData = $dbAdapter->query($sql)->fetchall();

        $jsonRes = [];
        if (is_array($clickData) && !empty($clickData)) {
            foreach ($clickData as $key => $value) {
                $json = [
                    'id' => $value['id'],
                    'ua' => $value['ua'],
                    'ip' => $value['ip'],
                    'ref' => $value['ref'],
                    'param1' => $value['param1'],
                    'param2' => $value['param2'],
                    'error' => $value['error'],
                    'bad_domain' => $value['bad_domain'],
                ];
                $jsonRes[] = $json;
            }
        }

        return $jsonRes;
    }

    /**
     * Get click info by id
     *
     * @param string $id Click id
     *
     * @return array
     */
    public function getClickInfoById($id)
    {
        $result = [];
        if ($id) {
            $table = new Zend_Db_Table($this->tableName);
            $select = $table->select()
                ->where('id = ?', $id);
            $res = $table->fetchRow($select);
            if ($res) {
                $result = $res->toArray();
            }
        }

        return $result;
    }

    /**
     * Insert data with click info
     *
     * @param array $data Data info
     */
    public function insertClickInfo($data)
    {
        if (is_array($data) && !empty($data)) {
            $table = new Zend_Db_Table($this->tableName);
            $table->insert($data);
        }
    }

    /**
     * Update click info
     *
     * @param array $data Data list
     * @param string|array $where Where conditions
     */
    public function updateClickInfo($data, $where)
    {
        if (is_array($data) && !empty($data) && is_array($where) && !empty($where)) {
            $table = new Zend_Db_Table($this->tableName);
            $table->update($data, $where);
        }
    }

    /**
     * @return string
     */
    public function getUserAgent()
    {
        return $this->userAgent;
    }

    /**
     * @param string $userAgent
     */
    public function setUserAgent($userAgent)
    {
        $this->userAgent = $userAgent;
    }

    /**
     * @return string
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * @param string $ip
     */
    public function setIp($ip)
    {
        $this->ip = $ip;
    }

    /**
     * @return string
     */
    public function getReferrer()
    {
        return $this->referrer;
    }

    /**
     * @param string $referrer
     */
    public function setReferrer($referrer)
    {
        $this->referrer = $referrer;
    }

    /**
     * @return string
     */
    public function getParam1()
    {
        return $this->param1;
    }

    /**
     * @param string $param1
     */
    public function setParam1($param1)
    {
        $this->param1 = $param1;
    }

    /**
     * @return string
     */
    public function getParam2()
    {
        return $this->param2;
    }

    /**
     * @param string $param2
     */
    public function setParam2($param2)
    {
        $this->param2 = $param2;
    }

    /**
     * Get domain name from referrer
     *
     * @param string $referrer Raw referrer url
     *
     * @return string Raw domain name
     */
    protected function getDomainNameFromReferrer($referrer)
    {
        $result = '';
        if ($referrer) {
            list(, $domainPart) = explode('://', $referrer);

            $result = preg_replace("#/(.+)?#", "", $domainPart);
        }

        return $result;
    }

    /**
     * Get common click params
     *
     * @return array Params list
     */
    protected function getCommonClickParams()
    {
        $params = [
            'ua' => $this->getUserAgent(),
            'ip' => $this->getIp(),
            'ref' => $this->getReferrer(),
            'param1' => $this->getParam1(),
            'param2' => $this->getParam2(),
            'error' => 0,
            'bad_domain' => 0,
        ];

        return $params;
    }

    /**
     * Get click id
     *
     * @return string Click id
     */
    protected function getClickId()
    {
        $userAgent = $this->getUserAgent();
        $ip = $this->getIp();
        $referrer = $this->getReferrer();
        $param1 = $this->getParam1();

        $idStr = $userAgent . $ip . $referrer . $param1;
        $id = md5($idStr);

        return $id;
    }
}
