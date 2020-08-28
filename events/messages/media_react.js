
module.exports = function mediaReaction(message){
    let hasAttachment = message.attachments.size > 0;
    let hasURL = message.content.indexOf('https://') !== -1 || message.content.indexOf('http://') !== -1;

    if (message.author.bot || message.system || message.channel.type === 'dm') return;
    if(hasAttachment || hasURL){
        message.react('📌');
    }
}