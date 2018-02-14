const bodyParser = require('body-parser');
var {Comment} = require('../models/comment');
var {Issue} = require('../models/issue');

exports.getAllCommentsForIssue = (req, res) => {
    console.log(req.body, res.body);
};

exports.createComment = (req, res, next) => {
    // create a new Comment based on request body
    const newComment = new Comment(req.body);
    // extract issueId from route
    const { issueId } = req.params;
    // set the comment's issue via route param
    newComment.issue = issueId;
    
    return newComment.save().then((comment) => {
        // update the issues's comments array
        return Issue.findByIdAndUpdate(issueId,
            // Add new comment's ObjectId to set of Issue.comments
            { $addToSet: { comments: comment._id } }
        );
    })
    .then(() => {
        res.send('Comment saved!');
    })
    .catch(err => next(err));
};