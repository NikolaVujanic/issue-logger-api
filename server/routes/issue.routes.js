// const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var issueController = require('../controllers/issue.controller');

router.get('/issues', issueController.getAllIssues);

router.post('/issues', issueController.createIssue);

module.exports = router;