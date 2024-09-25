// This event will run every time a message is created on any channel that the member has access to (including DMs)
import * as logger from 'morgan'
import * as config from 'config'
function onMessage(msg) {
    if (msg.author.bot) return;
    if (msg.content.indexOf(config.prefix) !== 0) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        command.execute(msg, args);
        logger.info(`${msg.author.tag} executed ${commandName}`);
        logger.info(`Args: ${args}`);
    } catch (error) {
        logger.error(error);
        msg.reply('There was an error trying to execute that command!');
    }
}