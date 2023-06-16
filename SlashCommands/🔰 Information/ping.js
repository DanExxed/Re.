const { Client, CommandInteraction } = require("discord.js");
const Discord = require(`discord.js`);

module.exports = {
    name: "ping",
    category: "Info",
    description: "Gets the bot ping",
    type: "bot",
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`);


      let date = new Date();
      let timestamp = date.getTime() - Math.floor(client.uptime);

      const embed = new Discord.MessageEmbed()
      .setAuthor(`ping of: ${client.user.tag}`, client.user.displayAvatarURL())
      .setDescription(`<:B_wifi:1043847321890324592> **API:**\n\`\`\`${Math.round(client.ws.ping)}ms\`\`\`\n<a:E_timer:991888999490785280> **Latency:**\n\`\`\`${msg.createdTimestamp - interaction.createdTimestamp}ms\`\`\``)
      .setColor(`BLUE`)
      .setFooter(client.config.footer, interaction.guild.iconURL())

      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [embed] });
      }, 500);
    },
};