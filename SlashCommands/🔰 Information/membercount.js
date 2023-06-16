const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment")

module.exports = {
    name: "membercount",
    description: "Gets the server's membercount",
    category: "Info",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);
      const ar = `<:E_arrow:992026718149824624>`
let myGuild = interaction.guild; 
      
      const members = interaction.guild.members.cache;
  let memberCount = myGuild.memberCount;
      
      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`<:E_member:991887198758649996> MemberCount of ${interaction.guild.name}`)
        .addField(`${ar} Total Members:`, `\`${memberCount}\`/\`${interaction.guild.maximumMembers}\``)
        .addField(`${ar} Total Bots:`, `\`${interaction.guild.members.cache.filter(member => member.user.bot).size}\``,)
        .addField(`${ar} Total Users:`, `\`${interaction.guild.members.cache.filter(member => !member.user.bot).size}\``,)
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
      .setFooter(client.config.footer) 

      
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb] });
      }, 500);
    },
};
