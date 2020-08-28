
module.exports = async function deleteMessage(reaction, user) {
    if(reaction.message.channel.type == 'dm'){

        if(user.bot) return; //Ignore bot reactions
        if(reaction.message.guild) return;
        
        let actionEmoji = reaction.emoji.name;
        if(actionEmoji == '🗑') {
            await reaction.message.delete();
        }
    }
}