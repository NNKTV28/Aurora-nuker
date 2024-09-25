// command to delete all messages in a channel
function deleteMessages(msg, args) {
    msg.channel.messages.fetch().then(messages => {
        msg.channel.bulkDelete(messages);
    });
}
module.exports = {
    name: 'deletemessages',
    description: 'Deletes all messages in a channel',
    execute(msg, args) {
        deleteMessages(msg, args);
        msg.reply('Deleted all messages');
    }
}