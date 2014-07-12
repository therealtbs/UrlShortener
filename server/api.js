var app = require('express').Router(),
    parser = require('body-parser'),
    auth = require('./auth'),
    db = require('./models'),
    id = require('short-id'),
    _ = require('lodash');
    
app.use(parser.json());
app.get('/links', auth, function (req, res) {
    db.Link.find().exec(function (err, data) {
        res.send(data.map(function (cur) {
            
            return {
                url: cur.url,
                link: cur.link,
                stats: { 
                    clicks: cur.length, 
                    byRef: _.countBy(cur.stats, 'ref'),
                    byCountry: _.countBy(cur.stats, 'country')
                }
            };
        }));
    });
});
app.get('/links/:short', auth, function (req, res) {
    db.Link.findOne({link: req.params.short}).exec(function (err, data) {
        if (!data) {
            console.error(err);
            res.status(404).send(err);
        } else {
            res.send(data);
        }
    });
});
app.post('/links', auth, function (req, res) {
    var link = new db.Link({stats: [], link: req.body.link || id.generate(), url: req.body.url});
    link.save(function (err) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            res.status(201).send(link);
        }
    });
});
app.delete('/links/:short', auth, function (req, res) {
    db.Link.findOneAndRemove({link: req.params.short}).exec(function (err) {
        if (err) {
            console.error(err);
            res.status(404).send(err);
        } else {
            res.send(201);
        }
    });
});
module.exports = app;