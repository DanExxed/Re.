const { Client, CommandInteraction } = require("discord.js");
const Discord = require(`discord.js`);

module.exports = {
    name: "uptime",
    category: "Info",
    description: "Fetchs the bots total uptime",
    type: "bot",
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`);


      let date = new Date();
      let timestamp = date.getTime() - Math.floor(client.uptime);

      const embed = new Discord.MessageEmbed()
      .setAuthor(`Uptime of: ${client.user.tag}`, client.user.displayAvatarURL())
      .setDescription(`<a:B_since:1043844064698707988> **__Up Since:__**\n> <t:${Math.floor(timestamp/1000)}:R>\n\n**__Launched at:__**\n<t:${Math.floor(timestamp/1000)}:F>`)
      .setColor(`BLUE`)
      .setFooter(client.config.footer, interaction.guild.iconURL())

      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [embed] });
      }, 500);
    },
};