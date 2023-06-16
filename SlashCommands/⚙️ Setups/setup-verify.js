const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const model = require("../../models/verifysystem")

module.exports = {
    name: "setup-verify",
    description: "Setup the Verify System",
    category: "Setup",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to make the verify channel",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: true,
      }, 
      {
        name: "role",
        description: "Select the Verify role",
        type: "ROLE",
        required: true,
      }, 
    ], 
    run: async (client, interaction, args) => {
      let ch = interaction.options.getChannel('channel');
      let role = interaction.options.getRole('role');
    //  let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp(`⚠️ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      
      
      const emb = new MessageEmbed()
      .setTitle(`Click the Button below to verify for **${interaction.guild.name}**!`)
        .setImage(`https://media.discordapp.net/attachments/938419784368943114/1020214184945922048/images.jpg`)
      .setFooter({ text: "Captcha Verification", iconURL: `${client.user.displayAvatarURL()}` })
      .setColor(client.config.color.main)

      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Verify`)
        .setStyle(`PRIMARY`)
        .setEmoji(`<:E_yes:992431126339657758>`)
        .setCustomId(`verify_start`)
      ])

      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(data) data.delete()

        new model({
          Guild: interaction.guild.id, 
          Channel: ch.id,
          Role: role.id,
        }).save()
      })
      ch.send({ content: ` `, embeds: [emb], components: [row] });
      return interaction.followUp({ embeds:[
new MessageEmbed()
          .setDescription(`${client.emoji.correct} **Setup the Verify System in ${ch}!**`)] })
    },
};
