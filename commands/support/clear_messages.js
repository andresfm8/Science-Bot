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
                        prompt: 'You must specify the number of messages to delete (max 10)',
                        type: 'integer',
                        validate: text => {
                            if(text < 11) return true;
                            return 'You cant delete more than 10 messages at the same time';    
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