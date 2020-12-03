const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
    performer: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    location: {type: String, required: true},
    cover: {type: Number, required: true}
});

module.exports = mongoose.model('Show', showSchema);