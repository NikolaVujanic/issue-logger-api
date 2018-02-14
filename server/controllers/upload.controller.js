exports.uploadFile = (req, res) => {
    console.log(req.body, req.files);

    // findAndUpdate 
    // req.params.issueId wrapp in new ObjectId()
    // attach array of files.path to Issue.files

    res.status(200).send('File uploaded!');
};