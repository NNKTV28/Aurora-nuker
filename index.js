const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const logger = require('pino')();
require('dotenv').config();
const fs = require('fs');
const config = require('./config.json');

logger.info('Starting up...');

// Create the client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Event when the bot joins a new guild
client.on('guildCreate', (guild) => {
  logger.info(`Joined guild: ${guild.name}`);
});

// Load commands from the /commands folder
client.commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

logger.info(`Loaded ${client.commands.size} commands.`);

// Event when the bot is ready
client.once('ready', async () => {
  logger.info(`Logged in as ${client.user.tag}!`);

  try {
    // Register commands
    const commands = [];
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
    }

    // Register commands with the Discord API
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    });

    logger.info(`Registered ${commands.length} commands.`);
  } catch (error) {
    logger.error('Failed to register commands:', error);
  }
});

// Event for message handling
client.on('messageCreate', async (msg) => {
  // Ignore messages from bots or those that don't start with the prefix
  if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Check if the command exists
  const command = client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  // Execute command if found
  try {
    await command.execute(msg, args);
  } catch (error) {
    logger.error(`Error executing command ${commandName}:`, error);
    msg.reply('There was an error executing that command!');
  }
});

// Log the bot into Discord
client.login(process.env.TOKEN).catch((error) => {
  logger.error('Failed to login:', error);
});
