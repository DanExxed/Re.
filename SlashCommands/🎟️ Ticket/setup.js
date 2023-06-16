const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const model = require("../../models/ticket");

        let cat;

module.exports = {
    name: "ticket-setup",
    category: "ticket",
    description: "Setup the ticket-system",
    premium: true,
    options: [
    {
        name: "system",
        description: "Select which Ticket-System you want to setup",
        type: "STRING",
        required: true,
        choices: [
          { name: `1st Ticket-System`, value: `1` },
          { name: `2nd Ticket-System`, value: `2` },
          { name: `3rd Ticket-System`, value: `3` },
          { name: `4th Ticket-System`, value: `4` },
          { name: `5th Ticket-System`, value: `5` },
        ]
      },
       {
        name: "style",
        description: "Select which style you want for ticket names",
        type: "STRING",
        required: true,
        choices: [
          { name: `ticket-{username}`, value: `ticket-` },
          { name: `📁│t・{username}`, value: `📁│t・` },
          { name: `🎫│t・{username}`, value: `🎫│t・` },
          { name: `📁│ticket・{username}`, value: `📁│ticket・` },
          { name: `🎫│ticket・{username}`, value: `🎫│ticket・` },
          { name: `📁・{username}`, value: `📁・` },
          { name: `🎫・{username}`, value: `🎫・` },
          { name: `📁・t・{username}`, value: `📁・t・` },
          { name: `🎫・t・{username}`, value: `🎫・t・` },
        ]
      },
      {
        name: "type",
        description: "What is the ticket type? General, Support, ect.",
        type: "STRING",
        required: true,
      },
      {
          name: "channel",
          description: "ticket-panel channel",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      },
      
      {
            name: "role",
            description: "Admin Role to manage tickets",
            type: 8,
            required: true,
      },
      {
        name: "button_label",
        description: "Label for the button",
        type: "STRING",
        required: true,
      },
      {
        name: "embed_desc",
        description: "Message on prompt",
        type: "STRING",
        required: true,
      },
      {
        name: "ticket_open_msg",
        description: "Message on ticket-open [Use +n+ to add a space]",
        type: "STRING",
        required: true,
      },
      {
          name: "category",
          description: "ticket category",
          type: "CHANNEL",
          channelTypes: ["GUILD_CATEGORY"],
          required: false,
      },
      
    ], 

    run: async (client, interaction, args) => {
      let s = interaction.options.getString('system');
      let ss = interaction.options.getString('type');
      let sss = interaction.options.getString('style');
      let channel = interaction.options.getChannel("channel");
      let category = interaction.options.getChannel("category");
      let role = interaction.options.getRole('role');
      let message = interaction.options.getString('embed_desc');
      let msg = interaction.options.getString('ticket_open_msg');
      let label = interaction.options.getString('button_label');
      let check = await interaction.guild.channels.cache.get(channel.id);

      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `${client.emoji.wrong} **You cannot use this Command to Manage the Ticket-System!**`, ephemeral: true})

      model.findOne({ Guild: interaction.guild.id, System: s }, async(err, data) => {

      if(!check) return interaction.followUp({ content: `${client.emoji.wrong} The args you provide either isn't a channel, or I can't view the selected channel.` })

      if(ss.length > 10) return interaction.followUp({ content: `${client.emoji.wrong} Your ticket-type can't be over 10 characters!` })

      const panel = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`**Open a Ticket in \`${interaction.guild.name}\`**`)
      .setDescription(`${message.split("+n+").join("\n")}`)
      .setFooter(`Press the Button below to open a ticket`, interaction.guild.iconURL())

      const button = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(label)
        .setStyle(`PRIMARY`)
        .setEmoji(`<:a_ticket:1002185875502944306>`)
        .setCustomId(`create_ticket${s}`)
      ])
      const embed = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`${client.emoji.correct} I have Setup the Ticket System`)
        .setDescription(`\nI have successfuly setup your ticket system! To setup the logs, use \`/ticket-logs\`!\n`)
      .addField(`<:E_system:992755038730596452> Ticket System Number:`, `**${s}**`)
        .addField(`<:E_system:992755038730596452> Ticket Type:`, `**${ss || `General`}**`)
      .addField(`<:E_channel:992269028766785577> Ticket Channel:`, `**${channel} (${channel.id})**`)
      .addField(`<:E_commands:991881472778698782> Ticket Category:`, `**${category || `_\`None Set, Using Default\`_`}**`)
      .addField(`${client.emoji.manage} Ticket Admin Role:`, `**${role} (${role.id})**`)
      .addField(`${client.emoji.preview} Ticket Message (On Open):`, msg.split("+n+").join("\n"))
      

        if(category) {
          cat = category.id
        } else {
          cat = null
        }
        
        if(data) { data.delete(); new model({
            Guild: interaction.guild.id, 
            System: s,
            Admin: role.id,
            OpenMsg: msg.split("+n+").join("\n"),
            Category: cat,
            Type: ss||`General`,
            Style: sss||`ticket-`,
          }).save() }
        if(!data) new model({
            Guild: interaction.guild.id, 
            System: s,
            Admin: role.id,
            OpenMsg: msg.split("+n+").join("\n"),
            Category: cat,
            Type: ss||`General`,
            Style: sss||`ticket-`,
          }).save()
        
      interaction.followUp({ embeds: [embed] })

      client.channels.cache.get(channel.id).send({ embeds: [panel], components: [button] }).catch((e) => { interaction.channel.send(`${client.emoji.wrong} I cant send the Embed to that channel! Check my perms!`)})
      })
    },
};