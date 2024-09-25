const discord = require('discord.js');
const logger = require('pino')()
require("dotenv").config();
const fs = require('fs');

try {
    logger.info('Starting up...');
    client = new discord.Client();
    client.commands = new discord.Collection();
} catch (error) {
    logger.error(error);
}

require('./events/ready.js')(client); // Load ready event


// Load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


// Login
client.login(process.env.TOKEN);