module.exports = {
    // Database connection string
    database: 'mongodb://YOURSERVER/YOURDB',
    // Admin login details
    username: 'YOURUSERNAME',
    password: 'YORPASSWORD',
    // Where should the server listen for requests
    listenOn: 'TCP', // can be either 'TCP' or 'UNIX' (case insensitive)
    ip: '0.0.0.0', // TCP only
    port: '3000', // TCP only
    unix: '/var/tmp/node.sock' // UNIX only
    
};