var express = require('express');
var router = express.Router();

var downloadController = require('../controllers/download.controller');

router.get('/download/:issueId/files/:fileId', downloadController.downloadFile);

module.exports = router;