var express = require('express');
var router = express.Router();
var uploadController = require('../controllers/upload.controller');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({
    uploadDir: './uploads/'
});
// '/upload/:issueId'
router.post('/upload', multipartyMiddleware, uploadController.uploadFile);

module.exports = router;