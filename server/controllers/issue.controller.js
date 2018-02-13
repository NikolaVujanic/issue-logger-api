const bodyParser = require('body-parser');
var {Issue} = require('../models/issue');

exports.getAllIssues = (req, res) => {
    Issue.find().then((issues) => {
        res.send({issues});
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