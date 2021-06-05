const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { DiscordTogether } = require('discord-together');

module.exports = {
    name: "start",
    category: "Together",
    aliases: ["s", "st", "begin", "proceed"],
    cooldown: 2,
    usage: "start",
    description: "Starts Discord Together",
    run: async (client, message, args, user, text, prefix) => {
        const choice = args[0];

        if (!choice) { // Checks if an activity was specified
            return message.channel.send('[ERROR] NO CHOICE PROVIDED'); // Returns an error message
        }

        if (!message.member.voice.channel) { // Checks if the author is in a voice channel
            return message.channel.send(`[ERROR] <@${message.author.id}> IS NOT IN A VOICE CHANNEL`); // Returns an error message
        }

        if (choice.toLowerCase() == 'yt' || choice.toLowerCase() == 'youtube' || choice.toLowerCase() == 'youtube.com') { // YouTube Invite
            if(message.member.voice.channel) {
                client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                    return message.channel.send(`${invite.code}`);
                });            
            };
        }

        if (choice.toLowerCase() == 'fishing' || choice.toLowerCase() == 'fish' || choice.toLowerCase() == 'f') { // Fishing Invite
            if(message.member.voice.channel) {
                client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
                    return message.channel.send(`${invite.code}`);
                });          
            };
        }

        if (choice.toLowerCase() == 'chess' || choice.toLowerCase() == 'c') { // Chess Invite
            if(message.member.voice.channel) {
                client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
                    return message.channel.send(`${invite.code}`);
                });          
            };
        }

        if (choice.toLowerCase() == 'betrayal' || choice.toLowerCase() == 'b') { // Betrayal Invite
            if(message.member.voice.channel) {
                client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
                    return message.channel.send(`${invite.code}`);
                });          
            };
        }

        if (choice.toLowerCase() == 'poker' || choice.toLowerCase() == 'p') { // Poker Invite
            if(message.member.voice.channel) {
                client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
                    return message.channel.send(`${invite.code}`);
                });          
            };
        }

    }
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
