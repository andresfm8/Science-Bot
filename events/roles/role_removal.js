
module.exports = async function removeRoles(client, reaction, user) {
    if(reaction.message.channel.id === '747625384010580029') {

        if(user.bot) return; //Ignore bot reactions
        if(!reaction.message.guild) return;

        let roleEmoji = reaction.emoji.name;
        let affectedUser = await reaction.message.guild.members.cache.get(user.id).roles;//Get roles of user

        switch(roleEmoji) {
            case '💡': 
                affectedUser.remove('747618519905992854');
                break;
            case '🔧':
                affectedUser.remove('748604401593352262');
                break;
            case '🔋':
                affectedUser.remove('747618346580705422');
                break;
            case '♻':
                affectedUser.remove('748604226149548075');
                break;
            case '📙':
                affectedUser.remove('748619269276958801');//other id
                break;
        }
    }
}

