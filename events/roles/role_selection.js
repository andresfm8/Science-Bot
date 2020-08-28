
module.exports = async function selectRoles(client, reaction, user) {
    if(reaction.message.channel.id === '747625384010580029') {

        if(user.bot) return; //Ignore bot reactions
        if(!reaction.message.guild) return;

        if(reaction.message.partial) await reaction.message.fecth();
        if(reaction.patial) await reaction.fetch();

        let roleEmoji = reaction.emoji.name;
        let affectedUser = await reaction.message.guild.members.cache.get(user.id).roles;

        switch(roleEmoji) {
            case '💡': 
                affectedUser.add('747618519905992854');
                break;
            case '🔧':
                affectedUser.add('748604401593352262');
                break;
            case '🔋':
                affectedUser.add('747618346580705422');
                break;
            case '♻':
                affectedUser.add('748604226149548075');
                break;
            case '📙':
                affectedUser.add('748619269276958801');//other id
                break;
        }
    }
}