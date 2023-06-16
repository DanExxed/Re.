const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
  name: 'ban',
  description: "Ban a user",
  category: "🎓 Punishment",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `member`,
      description: `Pick a user to ban`,
      type: "USER",
      required: true,
    },
    {
      name: `reason`,
      description: `Give a reason`,
      type: "STRING",
      required: false,
    }
  ],
  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    const user = interaction.options.getMember('member');
    const reason = interaction.options.getString('reason');

    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp(`🔒 You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)

    const memberPosition = user.roles.highest.rawPosition;
      const moderationPosition = interaction.member.roles.highest.rawPosition;

      if (user.id === interaction.member.id) return interaction.followUp({
            content: `${client.emoji.wrong} **You can't ban yourself!**`
        });

      if (moderationPosition <= memberPosition) return interaction.followUp(`${client.emoji.wrong} **You can't ban someone who is higher or equal to your role!**`)

      if (user.id === interaction.guild.ownerId) return interaction.followUp({
            content: `${client.emoji.wrong} **You cannot ban the Server Owner!**`
        });

      if (!user.bannable) return interaction.followUp(`${client.emoji.wrong} **I cannot ban this user! Please check my permissions!**`)
      

    const banned_emb = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`${user.user.tag} - Banned`)
      .addField(`**Ban Reason:**`, `${reason || `None Reason`}`)
      .addField(`**Moderator:**`, `${interaction.user} | \`${interaction.user.id}\` / *\`${interaction.user.tag}\`*`)

    user.send({ embeds: [banned_emb]}).catch(()=>{})
    user.ban({ reason: reason })
    
      
      return interaction.followUp({ embeds: [banned_emb] })

  }
}