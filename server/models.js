var mongoose = require('mongoose'),
    config = require('../config');

var statSchema = mongoose.Schema({
    ref: String,
    country: String,
    date: { type: Date, default: Date.now }
});

var linkSchema = mongoose.Schema({
    link: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    stats: [statSchema]
});
mongoose.connect(config.database);
exports.Link = mongoose.model('Link', linkSchema);