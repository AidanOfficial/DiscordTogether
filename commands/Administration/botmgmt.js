const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const errorCodes = require("../../botconfig/errorCodes.json");
const rgx = /^(?:<@!?)?(\d+)>?$/;
const staff = require("../../botconfig/whitelist.json");

module.exports = {
  name: "botmgmt",
  category: "Administration",
  aliases: ["mgmt", "admin", "shortcuts", "management", "botmanagement"],
  cooldown: 2,
  usage: "botmgmt <shortcut>",
  description: "Use DiscordTogether administration commands. Restricted to Bot Admins+.",
  run: async (client, message, args, user, text, prefix) => {
    try {
       function log(choice, actionTaker, secondaryOption) {
        const logEmbed = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`⚠️ ACTION | ${choice}`)
          .setDescription(`${actionTaker} made the action: \`${choice}\` with secondary option \`${secondaryOption}\`.`)
        client.channels.cache.get('850513779409551401').send(logEmbed);
      }
      if (!staff.allStaff.includes(message.author.id)) {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR: 100 | An error occurred`)
          .setDescription(`${errorCodes.adminErrors[100]}`)
        );
      }

      const choice = args[0]; // Defines the choice that the user made
      const secondaryOption = args[1]; // Defines the secondary choice that the user made (optional)

      if (!choice) {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR: 201 | An error occurred`)
          .setDescription(`${errorCodes.cmdErrors[201]}`)
        );
      }

      if (choice.toLowerCase() == 'codelist' || choice.toLowerCase() == 'list' || choice.toLowerCase() == 'actions' || choice.toLowerCase() == '0') { // Code List
        const choiceListEmbed = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext + " | ⚠️ All bot actions are logged.", ee.footericon)
          .setTitle(`ℹ | DiscordTogether | Bot Management Code List`)
          .setDescription(`\`0\` **| Show Choices | Args: 0** \n\`1\` **| Leave Guild | Args: [1] GuildID**`)
        message.member.send(choiceListEmbed);
        log('Codelist', `<@${message.author.id}>`, secondaryOption);
      }

      if (choice.toLowerCase() == '1' || choice.toLowerCase() == 'leaveguild') { // Guild Leave
        const guildID = secondaryOption; // Defines the GuildID
        if (!rgx.test(guildID)) {
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR: 101 | An error occurred`)
            .setDescription(`${errorCodes.adminErrors[101]}`)
          );
        }
        const guild = message.client.guilds.cache.get(guildID);
        if (!guild) {
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR: 102 | An error occurred`)
            .setDescription(`${errorCodes.adminErrors[102]}`)
          );
        }
        await guild.leave();
        message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`✅ SUCCESS | Guild Left`)
          .setDescription(`The provided guild has been left.`)
        )
      }
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

/* if (choice == 'TITLE') { // Choice Template to make an option
  // Code
} */