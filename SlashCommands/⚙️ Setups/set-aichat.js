const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const model = require("../../models/chatchannel")

module.exports = {
    name: "setup-aichat",
    description: "Setup the Chatbot Channel",
    category: "Setup",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to make the chatbot channel",
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
      .setTitle(`*This channel has now been set as the Chatbot channel!*`)
      .setFooter({ text: "Want To Talk To Me? Simply Type A Message In This Channel!", iconURL: `${client.user.displayAvatarURL()}` })
      .setColor(client.config.color.main)

      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(data) data.delete()

        new model({
          Guild: interaction.guild.id, 
          Channel: ch.id,
        }).save()
      })
      ch.send({ content: ` `, embeds: [emb]});
      return msg.edit({ content: `${client.emoji.correct} The chatbot system has successfully been setup view it here: ${ch}` })
    },
};
