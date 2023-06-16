const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const model = require("../../models/ticket_open");


module.exports = {
    name: "ticket-adduser",
    category: "ticket",
    description: "Add a user to the ticket",
    premium: true,
    options: [
      {
          name: "user",
          description: "user to add",
          type: "USER",
          required: true,
      },
      
    ], 

    run: async (client, interaction, args) => {
      let s = interaction.options.getString('system');
      let user = interaction.options.getUser("user");
      

      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `${client.emoji.wrong} **You cannot use this Command to Manage the Ticket!**`, ephemeral: true})

      model.findOne({Guild:interaction.guild.id, Channel:interaction.channel.id}, async(err, data) => {

      if(!data) return interaction.followUp({ content: `${client.emoji.wrong} I cant find this ticket in Database!` })

        //Change the User's perms to ticket
      interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        })
      interaction.channel.permissionOverwrites.edit(user.id, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        })


        
      interaction.followUp({ embeds: [ 
          new messageEmbed()
                            .setDescription(`${client.emoji.correct} Added ${user} to the ticket!`)] })

      })
    },
};