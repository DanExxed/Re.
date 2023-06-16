const Discord = require(`discord.js`)

const fetch = require("node-fetch");



module.exports = {

    name: "steam",
    category: "utility",
    description: "Check info of a steam game",

    type: 'CHAT_INPUT',

    options: [

        {

            name: 'game_name',

            description: 'The game name from steam',

            required: true,

            type: `STRING`

        }],

    run: async (client, interaction, args) => {

      let gamename = interaction.options.getString('game_name');

      let msg = await interaction.followUp(`Searching for the game... (If this stuck then your game name is not valid)`);



      

      let data = await fetch(`https://api.popcat.xyz/steam?q=${gamename}`).then(x => x.json())

      

      const embed = new Discord.MessageEmbed()

      .setAuthor(data.name,data.error, client.user.displayAvatarURL(), `${data.website}`)

      .setDescription(data.description, "Developer:", data.developers)

      .setImage(data.thumbnail)

      .setFooter(`Price, ${data.price}`)

      .setColor('#ff6666')

      

      setTimeout(() => {

        msg.edit({ content: ` `, embeds: [embed] });

      }, 500);

    }

}

