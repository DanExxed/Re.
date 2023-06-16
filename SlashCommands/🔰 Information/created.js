const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const day = require("dayjs")

module.exports = {
    name: "created",
    description: "check user acc created",
    category: "Info",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
    //  let msg = await interaction.followUp(`User: ${interaction.user.username}`);

      let difference = day(new Date()).diff(interaction.user.createdAt, 'day')
      
      setTimeout(() => {
        interaction.followUp({ embeds:[
new MessageEmbed()
  .setColor("BLUE")
    .setTitle(`Account Information`)        .setDescription(`<:a_member:1012280658585993306> username:- <@${interaction.user.id}>\n<:a_statistics:1015582709772464148>Account Created:- **${difference} days ago!**`)] });
      }, 500);
    },
};
