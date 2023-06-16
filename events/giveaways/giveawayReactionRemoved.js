const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle('❓ Hold Up Did You Just Remove a Reaction From A Giveaway?')
        .setColor("BLUE")
        .setDescription(
          `Your entry to [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) was recorded but you un-reacted.\n> **Giveaway for:** \`${giveaway.prize}\`\n> **Giveaway winners:** \`${giveaway.winnerCount}\``
        )
        .setFooter("Think It was a mistake? Go react again")
      ]
    }).catch(e => {})

  }
}