const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const staff = require("../../botconfig/whitelist.json");
const errorCodes = require("../../botconfig/errorCodes.json");

module.exports = {
  name: "say",
  category: "Administration",
  aliases: ["repeat"],
  cooldown: 2,
  usage: "say <TEXT>",
  description: "Resends your Text",
  run: async (client, message, args, user, text, prefix) => {
    try {

      if (!staff.allStaff.includes(message.author.id)) {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR: 100 | An error occurred`)
          .setDescription(`${errorCodes.adminErrors[100]}`)
        );
      }

      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR: 201 | An error occured`)
          .setDescription(`${errorCodes.cmdErrors[202]}`)
        );
      message.channel.send(text);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      );
    }
  }
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */