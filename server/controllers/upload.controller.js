const {ObjectID} = require('mongodb');

var {Issue} = require('./../models/issue');

exports.uploadFile = (req, res) => {
    var {issueId} = req.params;

    if(!ObjectID.isValid(issueId)) {
        return res.status(404).send();
    }

    // Get issue object 
    Issue.findById(issueId).then((issue) => {
        // Add uploaded files data to issue's files array 
        req.files.forEach(item => {
            issue.files.push(item);
        });
        // Update changes on issue object
        return issue.save();
    }).then((data) => {
        res.send(req.files);
    }).catch(e => res.status(400).send(e));
};