const { PermissionFlagsBits } = require('discord.js');

async function deleteMessages(msg) {
    try {
        let fetched;
        do {
            // Fetch up to 100 messages
            fetched = await msg.channel.messages.fetch({ limit: 100 });
            // Bulk delete messages that are less than 14 days old
            await msg.channel.bulkDelete(fetched, true);
        } while (fetched.size >= 2); // Loop until there are no more messages to delete
    } catch (error) {
        console.error('Error deleting messages:', error);
        msg.reply('There was an error while trying to delete the messages.');
    }
}

module.exports = {
    data: {
        name: 'deletemessages',
        description: 'Deletes all messages in the channel',
        default_member_permissions: PermissionFlagsBits.Administrator, // Requires admin permission to execute
    },
    permissions: ['Administrator'],
    async execute(msg, args) {
        if (!msg.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return msg.reply("You do not have permission to use this command.");
        }

        try {
            await deleteMessages(msg);
            msg.reply('Deleted all messages in this channel.');
        } catch (error) {
            console.error('Error executing deleteMessages command:', error);
            msg.reply('Failed to delete messages.');
        }
    },
};
