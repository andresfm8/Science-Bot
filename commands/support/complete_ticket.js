const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class CompleteTicket extends Command {
	constructor(client) {
		super(client, {
			name: 'complete',
			group: 'general',
			memberName: 'complete',
            description: 'Closes an existing ticket'
		});
	}

	async run(message) {
        //Make sure that it is hacker closing the ticket rather than a mentor or admin
        if (!message.member.roles.cache.find(role => role.name === 'hacker')) {
            message.channel.send('You need permissions to close a ticket.');
            return;
        }
        //Only the user that placed the ticket can mark it as completed
        const channelName = `${message.channel.name}`.toString().toLowerCase();
        const authorName = `${message.author.username}-ticket`.toString().toLowerCase();
        if (channelName.includes(authorName)) {
            message.channel.delete();
            const completeEmbed = new MessageEmbed()
                .setAuthor(`${message.author.tag}-ticket`)
                .setColor('RED')
                .setDescription('Your support ticket is now closed!');
            message.member.send(completeEmbed);
        } else {
            message.channel.bulkDelete(1)
                .catch(error => message.channel.send(`Error: ${error}`));

            message.member.send(`<@${message.author.id}> You can only close your ticket in your private channel!`);
        }
	}
};