const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name: String,
    course: String,
    date: Date,
    email: String,
    pdfLink: String,
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
