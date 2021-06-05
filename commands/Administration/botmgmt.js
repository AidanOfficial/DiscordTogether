const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const errorCodes = require("../../botconfig/errorCodes.json");
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: "botmgmt",
  category: "Administration",
  aliases: ["mgmt", "admin", "shortcuts", "management", "botmanagement"],
  cooldown: 2,
  usage: "botmgmt <shortcut>",
  description: "",
  run: async (client, message, args, user, text, prefix) => {

    const whitelist = [ // Defines Bot Management Whitelist
      "337325419416125442" // AidanOfficial#0001
    ];

    if (!whitelist.includes(message.author.id)) { // Returns an error if user is not on the Bot Management Whitelist (const whitelist)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR: 100 | An error occurred`)
        .setDescription(`${errorCodes.adminErrors[100]}`)
      );
    }

    const choice = args[0]; // Defines the choice that the user made
    const secondaryOption = args[1]; // Defines the secondary choice that the user made (optional)

    if (choice.toLowerCase() == 'codelist' || choice.toLowerCase() == 'list' || choice.toLowerCase() == 'actions') { // Code List
      const choiceListEmbed = new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`ℹ | DiscordTogether | Bot Management Code List`)
        .setDescription(`\`1\` **| Leave Guild | Args: [1] GuildID**`)
      message.member.send(choiceListEmbed);
    }

    if (choice.toLowerCase() == '1' || choice.toLowerCase() == 'leaveguild') { // Guild Leave
      const guildID = secondaryOption; // Defines the GuildID
      if (!rgx.test(guildID)) {
        return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR: 101 | An error occurred`)
        .setDescription(`${errorCodes.adminErrors[101]}`)
      );}
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
  }
}

/* if (choice == 'TITLE') { // Choice Template to make an option
  // Code
} */