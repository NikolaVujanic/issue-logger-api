var express = require('express');
var router = express.Router({mergeParams: true});
var commentController = require('../controllers/comment.controller');

router.get('/issues/:issueId/comments', commentController.getAllCommentsForIssue);

router.post('/issues/:issueId/comments', commentController.createComment);

module.exports = router;