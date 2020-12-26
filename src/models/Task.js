const mongoose = require('mongoose');
const { schema } = mongoose;

const Task = new mongoose.Schema({
    title: String,
    description: String
});

mongoose.model('Task', Task);

module.exports = mongoose.model('Task', Task);