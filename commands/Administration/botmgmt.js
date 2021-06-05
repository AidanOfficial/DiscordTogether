
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "botmgmt",
    category: "Administration",
    aliases: ["mgmt", "admin", "shortcuts", "management", "botmanagement"],
    cooldown: 2,
    usage: "botmgmt <shortcut>",
    description: "",
    run: async (client, message, args, user, text, prefix) => {
       // BOT - MGMT CODE 
  }
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
