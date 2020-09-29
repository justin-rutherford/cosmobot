const dotenv = require('dotenv');
const Discord = require('discord.js');
const { deleteOldMessages } = require('./deleteOldMessages');

const client = new Discord.Client();

dotenv.config();

client.on('ready', () => {
  const excludedChannels = process.env.EXCLUDED_CHANNELS;
  
  client.guilds.cache.forEach(guild => {
    guild.channels.cache.forEach(channel => {
      if(channel.type === 'text') {
        if(!excludedChannels.includes(channel.id)){
          deleteOldMessages(channel);
        }
      }
    });
  });
});

client.on('rateLimit', rateLimitInfo => {
  console.error(rateLimitInfo);
});

client.on('guildMemberAdd', member => {
  const userRoles = JSON.parse(process.env.USER_ROLES);

  userRoles.forEach(user => {
    if(user.id === member.id) {
      user.roles.forEach(roleName => {
        const role = member.guild.roles.cache.find(role => role.name === roleName);
        member.roles.add(role);
      });
    }
  });    
});

client.on('guildMemberRemove', member => {
  member.guild.systemChannel.send(`${member} left the server.`).catch(console.error);
});

client.login(process.env.TOKEN);
