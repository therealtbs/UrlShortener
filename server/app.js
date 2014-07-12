var express = require('express'),
    app = express(),
    passport = require('passport'),
    db = require('./models'),
    ip = require('geoip-lite');
    

app.use(passport.initialize());
app.use('/admin', require('./admin'));

app.get('/:link', function (req, res) {
    db.Link.findOne({link: req.params.link}).exec(function (err, data) {
        if (!data) {
            res.send(404, err);
        } else {
            res.redirect(data.url);
            data.stats.push({ref: req.get('Referrer'), country: ip.lookup(req.ip).country});
            data.save();
        }
    })
});

module.exports = app;