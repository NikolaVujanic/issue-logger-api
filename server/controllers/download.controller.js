const path = require('path');

exports.downloadFile = (req, res) => {
    // Get fileId(name in this case) from route params 
    var {fileId} = req.params;
    // Create file path for download
    var filePath = path.resolve(".")+'/uploads/'+fileId;
    // Download file
    res.download(filePath, fileId);
};