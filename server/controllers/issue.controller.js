const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {Issue} = require('../models/issue');
var {Comment} = require('../models/comment');

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
    var {issueId} = req.params;
    // Properties that can be updated
    var body = _.pick(req.body, ['title', 'description', 'completed']);

    if(!ObjectID.isValid(issueId)) {
        return res.status(404).send();
    }
    // Check if issues is completed or updated
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    // Update issue document
    Issue.findByIdAndUpdate(issueId, {$set: body}, {new: true}).then((issue) => {
        if(!issue) {
            return res.status(404).send();
        }

        res.send({issue});
    }).catch((e) => {
        res.status(400).send(e);
    });
};