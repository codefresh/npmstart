var express = require('express');
var router = express.Router();
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer("localhost:80");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/samples/:sample', function(req, res) {
  console.log("in samples router");
  proxy.web(req, res, { target: 'http://localhost:80' });
});

module.exports = router;
