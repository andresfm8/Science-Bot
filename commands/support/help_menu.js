const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class HelpMenu extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'general',
			memberName: 'help',
            description: 'Shows and describes other available commands'
        });
    }

    run(message) {
		
		const helpEmbed = new MessageEmbed()
			.setColor('ORANGE')
			.setTitle('Help Guide')
			.setDescription(`
					**Welcome!** \n
					Please select your interests. Go to the assign-role channel an react with the respective icon to your interests. \n
					**It is important to use the prefix before every command, otherwise the commands won't work**

					_Tickets_: These are to find help from mentors, you should place a ticket stating the reason of it so a mentor with the expertise in your matter is able to reach and support you. \n
					You open tickets in the find-a-mentor channel. You might add your team members to the ticket too. \n
					To open a ticket follow this structure: \`!openticket 'reason goes here' @member1 @member2 @member3 @member4 \` \n
					Remember that you can *add 0-4 team members* on each ticket and that you must **use single quotes to state the reason**. \n
					If you have an open ticket, you can close it in your private channel using \`!complete\` \n
					_Save attatchments_: If you want to save a message or an attachment that someone else sent, then react with 📌 to the message
					and you will receive a dm from the bot with the information. \n
					_Remove attachments_: every message that is saved into your dm's with the saving feature might be deleted using the
					🗑 reaction.`)
			.setFooter('If you need further support, please reach an admin.');

		message.author.send(helpEmbed);
		message.reply('I have send you a DM! If you did not receive anything, make sure your DM\'s are open');
	}
}