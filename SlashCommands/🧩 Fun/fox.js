const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const x = require("images-generator");

module.exports = {
    name: "fox",
    category: "🎮 Fun",
    description: "Get a random fox picture",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`);

      const i = await x.animal.fox();
      const emb = new MessageEmbed()
      .setAuthor(`Fox Picture`, client.user.displayAvatarURL())
      .setImage(i)
      .setColor('BLUE')

      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb] });
      }, 500);
    },
};
