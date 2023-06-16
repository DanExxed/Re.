const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const model = require("../../models/antispam");

module.exports = {
    name: "setup-antispam",
    description: "Setup the AntiSpam System",
    category: "Setup",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "max_messages",
        description: "Max messages per 10 seconds",
        type: "INTEGER",
        required: true,
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
      let aa_toggle = interaction.options.getString('toggle')
      let aa_limit = interaction.options.getInteger('max_messages')
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return msg.edit(`⚠️ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)

      if(aa_limit > 20) return msg.edit(`⚠ Don't you think ${aa_limit} is too high, for security it should be under 20 messages per 10 seconds.`)
      

      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(data && aa_toggle == 'disable'){
          data.delete()
        } else if(data && aa_toggle == 'enable'){
          data.delete()
          new model({
            Guild: interaction.guild.id, 
            Limit: aa_limit,
          }).save()
        } else {
           
          new model({
            Guild: interaction.guild.id, 
            Limit: aa_limit,
          }).save()
        }
      })
      return msg.edit({ content: `${client.emoji.correct} **The Anti-Spam System has been ${aa_toggle}d!**` })
    },
};
