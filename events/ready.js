const client = require('../index.js');
const logger = require('pino')()
client.on('ready', () => {
    logger.info('Logged in as ${client.user.tag}!');
});