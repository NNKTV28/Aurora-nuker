const { ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('../config.json');

async function deleteChannels(msg) {
    try {
        // Delete all channels in the guild
        const channels = msg.guild.channels.cache;
        for (const [channelId, channel] of channels) {
            await channel.delete();
            console.log(`Deleted channel: ${channel.name}`);
        }
    } catch (error) {
        console.error('Error deleting channels:', error);
        msg.reply('There was an error while trying to delete the channels.');
    }
}

module.exports = {
    data: {
        name: 'deletechannels',
        description: 'Deletes all channels and creates new ones based on config settings',
        default_member_permissions: PermissionFlagsBits.Administrator, // Requires admin permission to execute
    },
    permissions: ['Administrator'],
    async execute(msg, args) {
        if (!msg.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return msg.reply("You do not have permission to use this command.");
        }

        try {
            await deleteChannels(msg);
            msg.reply('Deleted all channels.');

            // Create new channels based on config settings
            const newChannelName = config.messagesSettings.nuked_channel_name;

            await msg.guild.channels.create({
                name: newChannelName,
                type: ChannelType.GuildText,
            });

            await msg.guild.channels.create({
                name: newChannelName,
                type: ChannelType.GuildCategory,
            });

            await msg.guild.channels.create({
                name: newChannelName,
                type: ChannelType.GuildAnnouncement,
            });

            await msg.guild.channels.create({
                name: newChannelName,
                type: ChannelType.GuildVoice,
            });

            await msg.guild.channels.create({
                name: newChannelName,
                type: ChannelType.GuildStageVoice,
            });

            await msg.guild.channels.create({
                name: newChannelName,
                type: ChannelType.GuildForum,
            });

            logger.info('Created all new channels.');
        } catch (error) {
            console.error('Error creating channels:', error);
            msg.reply('There was an error creating the new channels.');
        }
    },
};
