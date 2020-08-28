const { Discord } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = async function sendRolesEmbed(client) {

    const channel = client.channels.cache.find(channel => channel.name === 'assign-roles');

    let interestsEmbed = new MessageEmbed()
        .setTitle('Select your interests')
        .setDescription(`React to gain the role \n
                        💡 Entrepeneurship \n
                        🔧 Hardware \n
                        🔋 Electronic Eng. \n
                        ♻ Environmental Eng. \n
                        📙 Another Role`)
        .setColor('GREEN');
    let msgEmbed = await channel.send(interestsEmbed);
    msgEmbed.react('💡')
    .then(msgEmbed.react('🔧'))
    .then(msgEmbed.react('🔋'))
    .then(msgEmbed.react('♻'))
    .then(msgEmbed.react('📙'))
}