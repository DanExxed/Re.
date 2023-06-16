const Discord = require(`discord.js`)
const fetch = require("node-fetch");
const x = require("images-generator");

module.exports = {
    name: "duck",
    category: "🎮 Fun",
    description: "Get a random duck picture",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`);
      
      let data = await fetch("https://api.azury.live/duck").then(x => x.json())
      const embed = new Discord.MessageEmbed()
      .setAuthor(`😍 Cute duck`, client.user.displayAvatarURL(), `https://avedevelopment.tk/`)
      .setImage(data.image)
      .setColor('BLUE')
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [embed] });
      }, 500);
    }
}
