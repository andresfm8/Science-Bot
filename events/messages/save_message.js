
module.exports = async function pushMessage(reaction, user){

    if(user.bot) return; //Ignore bot reactions
    if(!reaction.message.guild) return;

    if(reaction.message.partial) await reaction.message.fecth();
    if(reaction.patial) await reaction.fetch();

    let actionEmoji = reaction.emoji.name;

    if(actionEmoji === '📌'){
        await user.send(reaction.message.content)
                .then((message) => message.react('🗑'));
    }
}