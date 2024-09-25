const { Client, GatewayIntentBits } = require('discord.js');
const logger = require('pino')()
require("dotenv").config();
const fs = require('fs');

logger.info('Starting up...');

// intents
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
], });

client.on('guildCreate', guild => {
    logger.info(`Joined guild: ${guild.name}`);
});
client.on('ready', () => {
    logger.info('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;
    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(msg, args);
    } catch (error) {
        logger.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
    logger.info(`${msg.author.tag} executed ${command}`);
    logger.info(`Args: ${args}`);
    logger.info(`Message: ${msg.content}`);
    logger.info(`Channel: ${msg.channel.name}`);
})
// Load commands in /commands/command.js
client.commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
logger.info(`Loaded ${client.commands.size} commands`);


// Login
client.login(process.env.TOKEN);