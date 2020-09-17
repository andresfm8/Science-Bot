const fs = require('fs')
const roles = JSON.parse(fs.readFileSync('data/roles.json', 'utf8'));

module.exports = async function removeRoles(reaction, user) {
    if(reaction.message.channel.id === '747625384010580029') {

        if(user.bot) return; //Ignore bot reactions
        if(!reaction.message.guild) return;

        let roleEmoji = reaction.emoji.name;
        let affectedUser = await reaction.message.guild.members.cache.get(user.id).roles;//Get roles of user
        //Iterate through roles and retrieve the emoji and id of each
        roles.forEach(role => {
            if(roleEmoji === role.emoji){
                affectedUser.remove(role.roleId);
                return;
            }
        });
    }
}