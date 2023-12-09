const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    post_title: {
        type: String,
        required: true,
    },
    discovered: {
        type: Date,
        required: true,
    },
    description: String,
    screen: String,
});


const groupSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true,
    },
    posts: [postSchema],
});

const Incident = mongoose.models.Incident || mongoose.model('Incident', groupSchema);
module.exports = Incident;
