var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    config = require('../config');

passport.use(new BasicStrategy(function (username, password, done){
    if (username === config.username && password === config.password) 
        return done(null, {auth: true});
    return done(true);
}));

module.exports = passport.authenticate('basic', {session: false});