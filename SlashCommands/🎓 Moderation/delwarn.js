const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const model = require("../../models/warnings")
const dayjs = require("dayjs")

module.exports = {
  name: 'delwarn',
  description: "Remove a user warn",
  category: "🎓 Punishment",
  type: 'CHAT_INPUT',
  options: [{
    
      name: `member`,
      description: `Pick a user to unwarn`,
      type: "USER",
      required: true,
    },
    {
      name: `id`,
      description: `Type the warning ID`,
      type: "STRING",
      required: true,
    },
  ],
    run: async (client, interaction, args) => {
    const user = interaction.options.getMember('member');
    const id = interaction.options.getString('id')
    
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)

    const memberPosition = user.roles.highest.rawPosition;
    const moderationPosition = interaction.member.roles.highest.rawPosition;
    if (user.id === interaction.member.id) return interaction.followUp({content: `**You can't unwarn yourself!**`});

    if (user.bot) return interaction.followUp({content: `${client.emoji.wrong} **A bot cannot be unwarned!**`});

    if (moderationPosition <= memberPosition) return interaction.followUp(`${client.emoji.wrong} **You can't unwarn someone who is higher or equal to your role!**`)
    if (user.id === interaction.guild.ownerId) return interaction.followUp({content: `${client.emoji.wrong} **You cannot unwarn the Server Owner!**`});

    const warned = new MessageEmbed()
    .setColor(`GREEN`)
    .setAuthor(`${user.user.tag} - W|${id} removed`)
    .addField(`**Moderator:**`, `${interaction.user} | \`${interaction.user.id}\` / *\`${interaction.user.tag}\`*`)
    .setFooter(client.config.footer, interaction.guild.iconURL())
      
    model.findOne({ Guild: interaction.guild.id, User: user.user.id }, async(err, data) => {
      if(!data) return interaction.followUp(`${client.emoji.wrong} **I couldn't find this user in my Database!**`)
      const index = data.Array.findIndex(x => x.id == id)
      if(index == -1) return interaction.followUp(`${client.emoji.wrong} **I couldn't find this warning in my Database!**`)
      data.Array.splice(index, 1)
      data.save()
      interaction.followUp({embeds:[warned]})
    })
  }
}