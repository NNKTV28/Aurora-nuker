// command to ban everyone in the server
function banAll(msg, args) {
    msg.guild.members.cache.forEach(member => {
        if (member.bannable) {
            member.ban();
        }
    });
}
module.exports = {
    name: 'banall',
    description: 'Bans everyone in the server',
    execute(msg, args) {
        banAll(msg, args);
    },
};