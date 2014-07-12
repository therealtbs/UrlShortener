var config = require('./config'),
    models = require('./server/models'),
    app = require('./server/app');
app.set('trust proxy', config.trustProxy);
if (config.listenOn.toUpperCase() === 'TCP') {
    app.listen(config.useEnv ? process.env.PORT : config.port, config.useEnv ? process.env.IP : config.ip);
    console.log('listening on %s:%s', config.ip, config.port);
} else if (config.listenOn.toUpperCase() === 'UNIX') {
    app.listen(config.unix);
    console.log('listening on unix:%s', config.unix);
} else {
    console.error("Invalid option specified for 'listenOn' can be either 'TCP' or 'UNIX'. Stopping NOW!");
    process.exit(1);
}
