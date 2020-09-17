const fs = require('fs')
const roles = JSON.parse(fs.readFileSync('data/roles.json', 'utf8'));

module.exports = async function selectRoles(reaction, user) {
    if(reaction.message.channel.id === '747625384010580029') {

        if(user.bot) return; //Ignore bot reactions
        if(!reaction.message.guild) return;

        if(reaction.message.partial) await reaction.message.fecth();
        if(reaction.patial) await reaction.fetch();

        let roleEmoji = reaction.emoji.name;
        let affectedUser = await reaction.message.guild.members.cache.get(user.id).roles;
        //Iterate through roles and retrieve the emoji and id of each
        roles.forEach(role => {
            if(roleEmoji === role.emoji){
                affectedUser.add(role.roleId);
                return;
            }
        });
    }
}