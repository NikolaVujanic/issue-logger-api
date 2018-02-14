var express = require('express');
var router = express.Router();
var issueController = require('../controllers/issue.controller');

router.get('/issues', issueController.getAllIssues);

router.get('/issues/:issueId', issueController.getSingleIssue);

router.post('/issues', issueController.createIssue);

router.delete('/issues/:issueId', issueController.deleteIssue);

router.patch('/issues/:issueId', issueController.updateIssue);

module.exports = router;