const client = require("../index");
const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const guildChannelId = '1075774081544237067';

client.on('guildCreate', guild => {
  const embed = new MessageEmbed()
    .setTitle(`Joined A Guild:`)
    .setColor('#2f3136')
    .setDescription(`**Guild Name**:\n\`\`\`${guild.name}\`\`\`\n**Guild ID:**\n\`\`\`${guild.id}\`\`\`\n**Member count:**\n\`\`\`${guild.memberCount}\`\`\``);

  client.on('ready', async () => {
    const guildChannel = await guild.channels.fetch(guildChannelId);

    if (guildChannel) {
      guildChannel.send({ embeds: [embed] });
    } else {
      console.log(`Could not find channel with ID ${guildChannelId}`);
    }
  });
});
