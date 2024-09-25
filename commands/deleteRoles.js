const { PermissionFlagsBits } = require('discord.js');

async function deleteRoles(msg) {
    try {
        // Fetch all roles and filter out the @everyone role which can't be deleted
        const roles = msg.guild.roles.cache.filter(role => role.editable && role.id !== msg.guild.id);

        for (const [roleId, role] of roles) {
            await role.delete();
            console.log(`Deleted role: ${role.name}`);
        }
        
        msg.reply('All deletable roles have been deleted.');
    } catch (error) {
        console.error('Error deleting roles:', error);
        msg.reply('There was an error while trying to delete the roles.');
    }
}

module.exports = {
    data: {
        name: 'deleteroles',
        description: 'Deletes all deletable roles in the guild',
        default_member_permissions: PermissionFlagsBits.Administrator, // Requires admin permission to execute
    },
    guildOnly: true, // Ensures the command is only run in a guild
    permissions: ['Administrator'],
    async execute(msg, args) {
        if (!msg.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return msg.reply("You do not have permission to use this command.");
        }

        try {
            await deleteRoles(msg);
        } catch (error) {
            console.error('Error executing deleteRoles command:', error);
            msg.reply('Failed to delete roles.');
        }
    },
};
