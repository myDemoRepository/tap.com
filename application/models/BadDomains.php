<?php

class Application_Model_BadDomains
{
    /**
     * Domain validate pattern
     */
    const DOMAIN_VALIDATE_PATTERN = '/^(?!\-)(?:[a-zA-Z\d\-]{0,62}[a-zA-Z\d]\.){1,126}(?!\d+)[a-zA-Z\d]{1,63}$/s';

    /**
     * @var string Table name
     */
    protected $tableName = 'bad_domains';

    /**
     * Get domains list
     *
     * @return array Domain ;ist
     */
    public function getDomains()
    {
        $table = new Zend_Db_Table($this->tableName);
        $select = $table->select();
        $result = $table->fetchAll($select)->toArray();

        return $result;
    }

    /**
     * Add new domain
     *
     * @param string $domainName
     *
     * @return array Result data
     */
    public function addDomain($domainName)
    {
        $status = false;
        $validDomain = preg_match(self::DOMAIN_VALIDATE_PATTERN, $domainName);

        if ($validDomain) {
            $table = new Zend_Db_Table($this->tableName);
            $select = $table->select();
            $domains = $table->fetchAll($select)->toArray();
            $existsFlag = false;
            if (is_array($domains) && !empty($domains)) {
                foreach ($domains as $key => $value) {
                    if ($domainName == $value['name']) {
                        $existsFlag = true;
                    }
                }
            }

            if (!$existsFlag) {
                $data = [];
                $data['id'] = '';
                $data['name'] = htmlspecialchars($domainName);
                $table->insert($data);
                $status = true;
            }
        }

        $result = [
            'status' => $status,
            'domain' => $domainName,
        ];

        return $result;
    }


    /**
     * Check if domain exits by given referrer
     *
     * @param string $referrerDomain Referrer
     *
     * @return bool True if domain exists false otherwise
     */
    public function checkIsDomainsExistsByReferrer($referrerDomain)
    {
        $exists = false;
        if ($referrerDomain) {
            $table = new Zend_Db_Table($this->tableName);
            $select = $table->select()
                ->where('name = ?', $referrerDomain);
            $result = $table->fetchRow($select);
            if ($result) {
                $exists = true;
            }
        }

        return $exists;
    }
}
