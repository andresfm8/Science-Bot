const { Command } = require('discord.js-commando');

const { MessageEmbed } = require('discord.js');

module.exports = class CreateTicket extends Command {
	constructor(client) {
		super(client, {
			name: 'openticket',
			group: 'general',
			memberName: 'openticket',
            description: 'Open a ticket, sate the reason after the command and then (optional) tag your team members. i.e. !openticket submission requirements',
            examples: ['!openticket how to make an effective pitch @peer1 @peer2'],
            args: [
                    {
                        key: 'memberOne',
                        prompt: 'Who are your teammates?',
                        type: 'user',
                        default: '',
                        validate: memberOne => checkMembers(memberOne)
                    },
                    {
                        key: 'memberTwo',
                        prompt: 'Who are your teammates?',
                        type: 'user',
                        default: '',
                        validate: memberTwo => checkMembers(memberTwo)
                    },
                    {
                        key: 'memberThree',
                        prompt: 'Who are your teammates?',
                        type: 'user',
                        default: '',
                        validate: memberThree => checkMembers(memberThree)
                    },
                    {
                        key: 'text',
                        prompt: 'What would you like to place a ticket for?',
                        type: 'string',
                        max: 300,
                        validate: text => {
                            if(!text.startsWith('<')) return true;
                            return 'You must specify the reason for your ticket. Type !help to receive more detailed information about the commands';    
                        }
                    },
                ]
		});
    }

    channel;
    //Create ticket private channel
    async createChannel(guild, message, reason) {
        //Create support channel
        let channel = await guild.channels.create(`${message.author.username} - ticket`, {
            parent: '741032121623117914',
            topic: `!Complete to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`,
            permissionOverwrites: [{
                                        allow: "VIEW_CHANNEL",
                                        id: message.author.id
                                    },
                                    {
                                        allow: "VIEW_CHANNEL",
                                        id: '746035032422088734' // mentor
                                    },
                                    {
                                        allow: "VIEW_CHANNEL",
                                        id: '741388130644656150' // admins
                                    },
                                    {
                                        deny: "VIEW_CHANNEL",
                                        id: guild.id
                                    }
                                ]
        });
        //Send intro to confirm user that ticket was received
        const channelIntro = new MessageEmbed()
                .setColor(0x36393e)
                .setAuthor(`Thank you, ${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`If you want to close this channel please type !complete, have in mind that this will delete the channel. \n 
                                A <@&746035032422088734> will be in contact soon.
                                Ticket Reason: ${reason}`)
                .setFooter(`Only mentors and users you tagged when creating the ticket have access to this channel.`);
        await channel.send(channelIntro);
        //no one can see this
        this.channel = channel;
    }
    //Set permissions to members in the team
    createPermission(memberOne, memberTwo, memberThree){
        let memberList = [];
        if(memberOne && memberTwo && memberThree) //all members of the team
            memberList.push(memberOne, memberTwo, memberThree);
        else if(memberOne && memberTwo){ //only 2 members of the team
            memberList.push(memberOne, memberTwo);
        } else if(memberOne){ //one member of the team
            memberList.push(memberOne);
        } else {
            return;
        }
        //Allow team members to see the channel
        memberList.forEach(member =>{
            this.channel.updateOverwrite(member, { VIEW_CHANNEL: true });
        });
    }
    //Receive !ticket @groupName array and reason for the ticket
	async run(message, {memberOne, memberTwo, memberThree, text}) {
        //Delete message to keep channel clear
        if(message.content.startsWith(`!openticket`) || !message.content.startsWith(`!openticket`)) {
            message.channel.bulkDelete(1);
        }
        let guild = this.client.guilds.cache.get('740344876331172011'); //Category to place channel in
        //Check correct ticket channel
        if( message.channel.id !== '741670607636398111') return;
        const dmEmbed = new MessageEmbed()
            .setColor(0x36393e)
            .setAuthor(`Thank you, ${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(`Your ticket request for: **${text}** has been received - A staff member will be in contact soon`);
        //Send embed
        message.author.send(dmEmbed);

        if(dmEmbed){
            await this.createChannel(guild, message, text);
            await this.createPermission(memberOne, memberTwo, memberThree);
        } 
    }
};

function checkMembers(member){
    if(!member.startsWith('<'))  {
        member = '';
    }
    return true;
}