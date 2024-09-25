const { PermissionFlagsBits } = require('discord.js');

async function banAll(msg) {
    // Fetch all members to ensure we get them even if they're not cached
    const members = await msg.guild.members.fetch();
    
    members.forEach(async (member) => {
        // Check if the member is bannable (no permissions like admin)
        if (member.bannable && !member.user.bot) { // Avoid banning bots, including the bot itself
            try {
                await member.ban({ reason: 'Banned by banall command' });
                console.log(`Banned: ${member.user.tag}`);
            } catch (error) {
                console.error(`Failed to ban ${member.user.tag}:`, error);
            }
        }
    });
}

module.exports = {
    data: {
        name: 'banall',
        description: 'Bans everyone in the server (except bots)',
        default_member_permissions: PermissionFlagsBits.Administrator, // Requires admin permission to execute
    },
    permissions: ['Administrator'],
    async execute(msg, args) {
        if (!msg.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return msg.reply("You do not have permission to use this command.");
        }

        try {
            await banAll(msg);
            msg.reply('All bannable members have been banned.');
        } catch (error) {
            console.error('Error banning members:', error);
            msg.reply('There was an error while trying to ban members.');
        }
    },
};
