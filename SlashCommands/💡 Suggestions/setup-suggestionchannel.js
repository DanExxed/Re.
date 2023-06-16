const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const model = require("../../models/sugchannel")

module.exports = {
    name: "setup-suggestion",
    description: "Setup the Suggestions Channel",
    category: "suggestion",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to send the order embed to",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: true,
      }
    ], 
    run: async (client, interaction, args) => {
      let ch = interaction.options.getChannel('channel');
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return msg.edit(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      
      
      const emb = new MessageEmbed()
      .setTitle(`*This channel has now been set as the Suggestion channel!*`)
      .setFooter({ text: "Want To Suggest / Feedback Something? Simply Type In This Channel!", iconURL: `${client.user.displayAvatarURL()}` })
      .setColor(client.config.color.main)

      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(data) data.delete()

        new model({
          Guild: interaction.guild.id, 
          Channel: ch.id,
        }).save()
      })
      ch.send({ content: ` `, embeds: [emb]});
      return msg.edit({ content: `💖 The suggestions system has successfully been setup view it here: ${ch}` })
    },
};
