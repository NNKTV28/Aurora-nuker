// command to delete all roles
function deleteRoles(msg, args) {
    msg.guild.roles.cache.forEach(role => {
        role.delete();
    });
}
module.exports = {
    name: 'deleteroles',
    description: 'Deletes all roles',
    execute(msg, args) {
        deleteRoles(msg, args);
    }
}