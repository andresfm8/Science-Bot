const { Command } = require('discord.js-commando');

module.exports = class CompleteTicket extends Command {
	constructor(client) {
		super(client, {
			name: 'clear',
			group: 'general',
			memberName: 'clear',
            description: 'Clears chat by given number of messages',
            clientPermissions: ['ADMINISTRATOR'],
            args: [
                    {
                        key: 'text',
                        prompt: 'What would you like to place a ticket for?',
                        type: 'string',
                        validate: text => {
                            if(text < 10) return true;
                            return 'You must specify the reason for your ticket. Type !help to receive more detailed information about the commands';    
                        }
                    }
                ]
        });
    }

    run(message, {text}) {
        if(message.member.roles.cache.has('740344876331172012' || '741388130644656150'))//Mod and admin ID
            message.channel.bulkDelete(parseInt(text));
	}
}