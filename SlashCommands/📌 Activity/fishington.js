const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "fishington-together",
    category: "Activity",
    description: "Use discord together with our bot using fishington",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.voice.channel) return msg.edit(`⚠ You must **be in a voice channel** to start fishington-together`)

      client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'fishington').then(async(invite) => {  
        const emb = new MessageEmbed()
        .setAuthor(`Fishington Together`, client.user.displayAvatarURL())
        .setDescription(`To join fishington together with our bot click the link below. \n\n **${invite.code}**`)
        .setColor('BLUE')

        setTimeout(() => {
          msg.edit({ content: ` `, embeds: [emb] });
        }, 500);
      })
    },
};
