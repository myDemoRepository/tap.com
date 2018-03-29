<?php

class ClickTest extends \Codeception\Test\Unit
{
    /**
     * @var Application_Model_Click
     */
    protected $model;

    protected function _before()
    {
        $this->model = new Application_Model_Click();
    }

    public function testGetUserAgent()
    {
        $this->model->setUserAgent('ua');
        $this->assertEquals('ua', $this->model->getUserAgent());

        $this->model->setUserAgent('mozilla');
        $this->assertEquals('mozilla', $this->model->getUserAgent());

        $this->model->setUserAgent('chrome');
        $this->assertEquals('chrome', $this->model->getUserAgent());

        $this->model->setUserAgent('safari');
        $this->assertEquals('safari', $this->model->getUserAgent());
    }

    public function testSetParams()
    {
        $params = [
            'ua' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0',
            'ip' => '127.0.0.1',
            'referrer' => 'http://tap.com/',
            'param1' => 'new',
            'param2' => 'set',
        ];

        $this->model->setParams($params);
        $this->assertEquals(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0',
            $this->model->getUserAgent()
        );
        $this->assertEquals('127.0.0.1', $this->model->getIp());
        $this->assertEquals('tap.com', $this->model->getReferrer());
        $this->assertEquals('new', $this->model->getParam1());
        $this->assertEquals('set', $this->model->getParam2());
    }

}