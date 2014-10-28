var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/samples/:sample', function(req, res) {
  console.log("in samples router");
  proxy.web(req, res, { target: 'http://localhost:80' });
});

module.exports = router;
