const bodyParser = require('body-parser');
var {Issue} = require('../models/issue');
var {Comment} = require('../models/comment');
const {ObjectID} = require('mongodb');

exports.getAllIssues = (req, res) => {
    Issue.find().then((issues) => {
        res.send({issues});
    }, (e) => {
        res.status(400).send(e);
    });
};

exports.getSingleIssue = (req, res) => {
    var {issueId} = req.params;

    if(!ObjectID.isValid(issueId)) {
        return res.status(404).send();
    }

    Issue.findById(req.params.issueId).then((issue) => {
        res.send({issue});
    }, (e) => {
        res.status(400).send(e);
    });
};

exports.createIssue = (req, res) => {
    var issue = new Issue({
        title: req.body.title,
        description: req.body.description
    });

    issue.save().then((issue) => {
        res.send({issue});
    }, (e) => {
        res.status(400).send(e);
    });
};

exports.deleteIssue = (req, res) => {
    var {issueId} = req.params;

    if(!ObjectID.isValid(issueId)) {
        return res.status(404).send();
    }

    // Remove issue by id
    Issue.findByIdAndRemove(issueId).then((issue) => {
        if(!issue) {
            return res.status(404).send();
        }
        // Send removed issue back
        res.send({issue});

        // Remove all attached comments
        return Comment.remove({_id: {$in:issue.comments}});
    }, (e) => {
        res.status(400).send(e);
    });
};

exports.updateIssue = (req, res) => {

};