const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const model = require("../../models/leavesystem")

module.exports = {
    name: "setup-leave",
    category: "Setup",
    description: "Setup the Leave System",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to make the leave channel",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: true,
      },
      {
        name: "show_members",
        description: "Show a button underneath the text with total members",
        type: "STRING",
        required: true,
        choices: [
          {name:"true" ,value:"true"},
          {name:"false",value:"false"},
        ]
      },
      {
        name: "leave_msg",
        description: "Text underneath the leave message",
        type: "STRING",
        required: false,
      },
    ], 
    run: async (client, interaction, args) => {
      let aa = interaction.options.getString(`show_members`);
      let ch = interaction.options.getChannel('channel');
      let wel_msg = interaction.options.getString(`leave_msg`);
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return msg.edit(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      


      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(data) data.delete()

        new model({
          Guild: interaction.guild.id, 
          Channel: ch.id,
          Message: wel_msg||null,
          ShowMembers: aa,
        }).save()
      })
      
      return msg.edit({ content: `${client.emoji.correct} **Setup the Leave system in ${ch}!**` })
    },
};
