var express = require('express');
var router = express.Router();

router.use('/films', require('./films'));

  module.exports = router;