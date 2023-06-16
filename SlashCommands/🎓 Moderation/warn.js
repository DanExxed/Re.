const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const model = require("../../models/warnings")
const dayjs = require("dayjs")

function new_set(){
  var length = 5,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

module.exports = {
  name: 'warn',
  description: "Warn a user",
  category: "🎓 Punishment",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `member`,
      description: `Pick a user to warn`,
      type: "USER",
      required: true,
    },
    {
      name: `reason`,
      description: `Give a reason`,
      type: "STRING",
      required: true,
    }
  ],
    run: async (client, interaction, args) => {
    const user = interaction.options.getMember('member');
    const reason = interaction.options.getString('reason');
    
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp(`🔒 You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)

    const memberPosition = user.roles.highest.rawPosition;
    const moderationPosition = interaction.member.roles.highest.rawPosition;
    if (user.id === interaction.member.id) return interaction.followUp({content: `${client.emoji.wrong} **You can't warn yourself!**`});

    if (user.bot) return interaction.followUp({content: `${client.emoji.wrong} **A bot cannot be warned!**`});

    if (moderationPosition <= memberPosition) return interaction.followUp(`${client.emoji.wrong} **You can't warn someone who is higher or equal to your role!**`)
    if (user.id === interaction.guild.ownerId) return interaction.followUp({content: `${client.emoji.wrong} **You cannot warn the Server Owner!**`});

    const warned = new MessageEmbed()
    .setColor(`GREEN`)
    .setAuthor(`${user.user.tag} - Warned`)
      .addField(`**Warn Reason:**`, `${reason || `None Reason`}`)
      .addField(`**Moderator:**`, `${interaction.user} | \`${interaction.user.id}\` / *\`${interaction.user.tag}\`*`)
    .setFooter(client.config.footer, interaction.guild.iconURL())
    model.findOne({ Guild: interaction.guild.id, User: user.user.id }, async(err, data) => {
      if(!data){
        data = new model({
          Guild: interaction.guild.id,
          User : user.user.id,
          Array: [
            {
              mod   : interaction.user.id,
              reason: reason,
              data  : dayjs(new Date()).unix(),
              id    : new_set() + "-" + new_set() + "-" + new_set()
            }
          ]
        })
      } else {
        const object = {
          mod: interaction.user.id,
          reason: reason,
          data: dayjs(new Date()).unix(),
          id: new_set() + "-" + new_set() + "-" + new_set()
        }
        data.Array.push(object)
      }
      data.save()
      
      interaction.followUp({ embeds: [warned] })
      
      user.send({ embeds: [warned]}).catch(()=>{})
    })
  }
}
