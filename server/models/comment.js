var mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    createdAt: {
        type: Number,
        default: null
    },
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = {Comment};