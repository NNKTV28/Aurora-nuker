const config = require('../config.json');
// command to delete all channels
function deleteChannels(msg, args) {
    msg.guild.channels.cache.forEach(channel => {
        channel.delete();
    });
}
module.exports = {
    name: 'deletechannels',
    description: 'Deletes all channels',
    execute(msg, args) {
        deleteChannels
        msg.reply('Deleted all channels');
        msg.guild.channels.create(config.messagesSettings.nuked_channel_name, { type: 'text' });
        msg.guild.channels.create(config.messagesSettings.nuked_channel_name, { type: 'category' });
        msg.guild.channels.create(config.messagesSettings.nuked_channel_name, { type: 'news' });
        msg.guild.channels.create(config.messagesSettings.nuked_channel_name, { type: 'voice' });
        msg.guild.channels.create(config.messagesSettings.nuked_channel_name, { type: 'store' });
        msg.guild.channels.create(config.messagesSettings.nuked_channel_name, { type: 'forum' });
        msg.guild.channels.create(config.messagesSettings.nuked_channel_name, { type: 'stage' });
        msg.guild.channels.create(config.messagesSettings.nuked_channel_name, { type: 'media' });
        msg.guild.channels.create(config.messagesSettings.nuked_channel_name, { type: 'link' });
    }
}