const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const x = require("images-generator");

module.exports = {
    name: "bunny",
    category: "🎮 Fun",
    description: "Get a random bunny picture",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`);

      const i = await x.animal.bunny();
      const emb = new MessageEmbed()
      .setAuthor(`Bunny Picture`, client.user.displayAvatarURL())
      .setImage(i)
      .setColor('BLUE')

      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb] });
      }, 500);
    },
};
