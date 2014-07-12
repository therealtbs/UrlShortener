var app = require('express').Router(),
    express = require('express'),
    path = require('path');
app.use('/api', require('./api'));
app.use('*/assets', express.static(path.resolve(__dirname + '/../client/assets')));

app.get('*', function (req, res) {
    res.sendfile(path.resolve(__dirname + '/../client/index.html'));
});

module.exports = app;