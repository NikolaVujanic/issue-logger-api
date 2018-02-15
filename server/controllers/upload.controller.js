const {ObjectID} = require('mongodb');

var {Issue} = require('./../models/issue');

exports.uploadFile = (req, res) => {

    var {issueId} = req.params;

    if(!ObjectID.isValid(issueId)) {
        return res.status(404).send();
    }

    // Issue.findById(issueId).then((issue) => {
    //     issue.files.push(req.files.file);
    //     return issue.save();
    // }).then((data) => {
    //     res.send('Fisnihed');
    // }).catch((e) => {
    //     res.status(400).send(e);
    // });
};