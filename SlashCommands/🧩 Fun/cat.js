const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const x = require("images-generator");

module.exports = {
    name: "cat",
    category: "🎮 Fun",
    description: "Get a random cat picture",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`);

      const i = await x.animal.cat();
      const emb = new MessageEmbed()
      .setAuthor(`Cat Picture`, client.user.displayAvatarURL())
      .setImage(i)
      .setColor('BLUE')

      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb] });
      }, 500);
    },
};
