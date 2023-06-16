const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "npm",
    description: "Search for npm packages!",
    category: "utility",
    type: 'CHAT_INPUT',
    options: [
        {
            name: `name`,
            description: `Name of the package`,
            type: `STRING`,
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString("name")

        let res = await fetch(`https://api.popcat.xyz/npm?q=${query}`)

        let json = await res.json()

        let embed = new MessageEmbed()
            .setColor(client.config.color.main)
            .setTitle(`${client.emoji.arrow} NPM`)
            .addField(`${client.emoji.arrow} Package :`, `${json.name}`)
            .addField(`${client.emoji.arrow} Description :`, `${json.description}`)
            .addField(`${client.emoji.arrow} Version :`, `${json.version}`)
            .addField(`${client.emoji.arrow} Author :`, `${json.author}`)
            .addField(`${client.emoji.arrow}
Repository :`, `${json.repository}`)
            .addField(`${client.emoji.arrow} Maintainers :`, `${json.maintainers}`)
            .addField(`${client.emoji.arrow} Keywords :`, `${json.keywords}`)
            .addField(`${client.emoji.arrow} Last Published At :`, `${json.last_published}`)

            interaction.followUp({
                embeds: [embed]
            })
    },
};
