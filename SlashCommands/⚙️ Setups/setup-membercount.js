const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const model = require("../../models/membercountsystem")

module.exports = {
    name: "setup-membercount",
    description: "Setup the Member Count System",
    category: "Setup",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel that will be changed",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT", "GUILD_VOICE"],
        required: true,
      },
      {
        name: "type",
        description: "Select what type of data to send",
        type: "STRING",
        required: true,
        choices: [
          {name:"Total Members",value:"members"},
          {name:"Total Users" ,value:"users"},
          {name:"Total Bots",value:"bots"},
        ]
      },
    ], 
    run: async (client, interaction, args) => {
      let type = interaction.options.getString('type');
      let channel = interaction.options.getChannel('channel')
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return msg.edit(`⚠️ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      
      


      model.findOne({ Guild: interaction.guild.id, Type: type }, async(err, data) => {
        
        if(data) {
          interaction.channel.send(`Since the type, **${type}** was already setup, I deleted the old data and set the new one!`)
          data.delete()
        }

        new model({
          Guild: interaction.guild.id, 
          Type: type,
          Channel: channel.id,
        }).save()
          return msg.edit({ content: `${client.emoji.correct} **Setup the MemberCount system! The channel, ${channel} will be renamed every 2 mins!**\n*Preview:* \`Total ${type}: 000\`` })
        
      })
      
    },
};
