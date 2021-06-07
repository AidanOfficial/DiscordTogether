//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs
const ee = require("././botconfig/embed.json");
const moment = require("moment");

//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
require('discord-buttons')(client); // Starting the discord-buttons class
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('clickButton', async (button) => {
  if (button.id == 'ID_HERE') {
    button.reply.send('REPLY');
  }
});

client.on('guildCreate', (guild) => {
  const guildEmbed = new Discord.MessageEmbed()
    .setTitle('✅ SUCCESS | Guild Joined')
    .setColor(ee.color)
    .setFooter(ee.footertext, ee.footericon)
    .setDescription(`**Guild Name:** \`${guild.name}\` \n**Guild ID:** \`${guild.id}\` \n**Guild Owner:** \`${guild.ownerID}\` \n**Guild Member Count:** \`${guild.memberCount}\` \n**Guild Creation Date:** \`${moment(guild.createdAt).format('MMM DD, YYYY')}\``)
    client.channels.cache.get('850513779409551404').send(guildEmbed);
});
client.on('guildDelete', (guild) => {
  const guildLeftEmbed = new Discord.MessageEmbed()
    .setTitle('❌ FAILURE | Guild Left')
    .setColor(ee.wroong)
    .setFooter(ee.footertext, ee.footericon)
    .setDescription(`**Guild Name:** \`${guild.name}\` \n**Guild ID:** \`${guild.id}\` \n**Guild Owner:** \`${guild.ownerID}\` \n**Guild Member Count:** \`${guild.memberCount}\` \n**Guild Creation Date:** \`${moment(guild.createdAt).format('MMM DD, YYYY')}\``)
    client.channels.cache.get('850513779409551405').send(guildLeftEmbed);
});

//login into the bot
client.login(require("./botconfig/config.json").token);

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
