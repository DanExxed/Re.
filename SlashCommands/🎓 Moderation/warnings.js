const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const model = require("../../models/warnings")
const dayjs = require("dayjs")

module.exports = {
  name: 'warnings',
  description: "Fetch all a users warnings",
  category: "🎓 Punishment",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `member`,
      description: `Pick a user to view warnings of`,
      type: "USER",
      required: true,
    }
  ],
    run: async (client, interaction, args) => {
    const user = interaction.options.getMember('member');
    
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp(`🔒 You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      
    model.findOne({ Guild: interaction.guild.id, User: user.user.id }, async(err, data) => {
      if(!data) return interaction.followUp({ content: `${client.emoji.wrong} ${user.user.tag} doesn't have any warnings!` })
      if(Object.keys(data.Array).length <= 0) return interaction.followUp({ content: `${client.emoji.wrong} ${user.user.tag} doesn't have any warnings!` })

      const warnings_emb = new MessageEmbed()
      .setColor(`RED`)
      .setAuthor(`${user.user.tag} - ${Object.keys(data.Array).length} warnings`, user.user.displayAvatarURL({ dynamic: true }))
      .addFields(data.Array.map((x, y) => {
      return { name: `ID: ${x.id} | Moderator: ${client.users.cache.get(x.mod).tag}`, value: `${x.reason} - <t:${x.data}:D>` }
      }))
      return interaction.followUp({ embeds: [warnings_emb] })
    })
  }
}