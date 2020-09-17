const { Discord } = require('discord.js');
const { MessageEmbed } = require('discord.js');

const fs = require('fs')
const roles = JSON.parse(fs.readFileSync('data/roles.json', 'utf8'));

module.exports = async function sendRolesEmbed(client) {
    //Find channel with specified name
    const channel = client.channels.cache.find(channel => channel.name === 'assign-interests');

    let interestsEmbed = new MessageEmbed()
        .setTitle('Select your interests')
        .setDescription(`React to gain the role \n
                        ${displayRoles()}`)
        .setColor('GREEN');
    let msgEmbed = await channel.send(interestsEmbed);

    roles.forEach(role => msgEmbed.react(role.emoji));
}
//Create a string that has all roles with their respective emojis
function displayRoles(){
    let roleList =''
    roles.forEach(role =>{
        roleList += `${role.emoji} ${role.name}\n`
    })
    return roleList;
}