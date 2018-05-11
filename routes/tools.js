var express = require('express');
var router = express.Router();

/* GET tools listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
