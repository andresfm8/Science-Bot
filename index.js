const { CommandoClient } = require('discord.js-commando');

const path = require('path');

const {owner, token, prefix} = require('./config.json');

const sendRolesEmbed  = require('./events/roles/role_options');
const selectRoles  = require('./events/roles/role_selection');
const removeRoles = require('./events/roles/role_removal');
const mediaReaction = require('./events/messages/media_react');
const pushMessage = require('./events/messages/save_message');
const deleteMessage = require('./events/messages/delete_message');

const client =  new CommandoClient({
    commandPrefix: prefix,
    owner: owner,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.registry.registerDefaultTypes()
                .registerGroup('general', 'General Commands')
                .registerDefaultGroups()
                .registerDefaultCommands()
                .registerCommandsIn(path.join(__dirname, '/commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
    sendRolesEmbed(client);
});

client.on('message', message => mediaReaction(message));

client.on('messageReactionAdd', async (reaction, user) => pushMessage(reaction, user));
client.on('messageReactionAdd', async (reaction, user) => deleteMessage(reaction, user));

client.on('messageReactionAdd', async (reaction, user) => selectRoles(client, reaction, user));
client.on('messageReactionRemove', async (reaction, user) => removeRoles(client, reaction, user));
//Assign hacker role to every new member
client.on('guildMemberAdd', (guildMember) => {
    guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.id === '746036114464309248'))
    .then(guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.id === '746114639317696604')));
 });

client.on('error', console.error);

client.login(token)