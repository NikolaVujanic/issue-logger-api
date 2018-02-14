var express = require('express');
var router = express.Router();
var issueController = require('../controllers/issue.controller');

router.get('/issues', issueController.getAllIssues);

router.get('/issues/:issueId', issueController.getSingleIssue);

router.post('/issues', issueController.createIssue);

router.delete('/issue/:issueId', issueController.deleteIssue);

router.patch('/issue/:issueId', issueController.updateIssue);

module.exports = router;