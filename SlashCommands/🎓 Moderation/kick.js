const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
  name: 'kick',
  description: "Kick a user",
  category: "🎓 Punishment",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `member`,
      description: `Pick a user to kick`,
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

    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)

    const memberPosition = user.roles.highest.rawPosition;
      const moderationPosition = interaction.member.roles.highest.rawPosition;

      if (user.id === interaction.member.id) return interaction.followUp({
            content: `${client.emoji.wrong} **You can't kick yourself!**`
        });

      if (moderationPosition <= memberPosition) return interaction.followUp(`${client.emoji.wrong} **You can't kick someone who is higher or equal to your role!**`)

      if (user.id === interaction.guild.ownerId) return interaction.followUp({
            content: `${client.emoji.wrong} **You cannot kick the Server Owner!**`
        });

      if (!user.kickable) return interaction.followUp(`${client.emoji.wrong} **I cannot kick this user! Please check my permissions!**`)
      

    const kickned_emb = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`${user.user.tag} - Kicked`)
      .addField(`**Kick Reason:**`, `${reason || `None Reason`}`)
      .addField(`**Moderator:**`, `${interaction.user} | \`${interaction.user.id}\` / *\`${interaction.user.tag}\`*`)

    user.send({ embeds: [kickned_emb]}).catch(()=>{})
    user.kick({ reason: reason })
    
      
      return interaction.followUp({ embeds: [kickned_emb] })

  }
}
/* ============================================== */
/* ⭐ Azury Manager • Private • Server Manager ⭐ */
/* Coded by discord.gg/azury Copyrighted @ Azury  */
/* ============================================== */