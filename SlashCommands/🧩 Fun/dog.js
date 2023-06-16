const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const x = require("images-generator");

module.exports = {
    name: "dog",
    category: "🎮 Fun",
    description: "Get a random dog picture",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`);

      const i = await x.animal.dog();
      const emb = new MessageEmbed()
      .setAuthor(`Dog Picture`, client.user.displayAvatarURL())
      .setImage(i)
      .setColor('BLUE')

      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb] });
      }, 500);
    },
};
