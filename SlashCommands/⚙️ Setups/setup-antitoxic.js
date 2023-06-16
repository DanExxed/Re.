const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const model = require("../../models/toxicsystem")

module.exports = {
    name: "setup-antitoxic",
    description: "Setup the Verify System",
    category: "Setup",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "max-percent",
        description: "The percent to take action on",
        type: "INTEGER",
        required: true,
      }, 
      {
        name: "action",
        description: "Select what action to take",
        type: "STRING",
        required: true,
        choices: [
          {name:"None",value:"none"},
          {name:"Timeout" ,value:"timeout"},
          {name:"Kick",value:"kick"},
          {name:"Ban",value:"ban"},
        ]
      },
      {
        name: "toggle",
        description: "Select to enable or disable this module",
        type: "STRING",
        required: true,
        choices: [
          {name:"enable" ,value:"enable"},
          {name:"disable",value:"disable"},
        ]
      },
    ], 
    run: async (client, interaction, args) => {
      let action = interaction.options.getString('action');
      let value = interaction.options.getInteger('max-percent');
      let aa_toggle = interaction.options.getString('toggle')
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return msg.edit(`⚠️ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      
      


      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(aa_toggle == 'enable') {
          if(value > 100) return msg.edit({ content: `${client.emoji.correct} **The percent can't be over 100!**` })
        if(data) data.delete()

        new model({
          Guild: interaction.guild.id, 
          Value: value,
          Action: action,
        }).save()
          return msg.edit({ content: `${client.emoji.correct} **Setup the Anti-Toxic System! I will now take action on people if their message is over \`${value}%\` toxic.**` })
        } else if(aa_toggle == 'disable') {
          if(data) {
            data.delete(); 
            return msg.edit({ content: `${client.emoji.correct} **Disabled the Anti-Toxic system!**` })
          } else if(!data) {
            return msg.edit({ content: `${client.emoji.correct} **The Anti-Toxic System was never setup!**` })
          }
        }
      })
      
    },
};
