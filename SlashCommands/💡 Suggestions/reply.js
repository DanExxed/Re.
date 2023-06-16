const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const model = require("../../models/sugchannel")

module.exports = {
    name: "reply",
    description: "Reply to a suggestion",
    category: "suggestion",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "message",
        description: "State the suggestion message id to reply to",
        type: "STRING",
        required: true,
      },
      {
        name: "type",
        description: "Select a type from the options above to edit this suggestion to",
        type: "STRING",
        required: true,
        choices: [
          { name: `Accept`, value: `accept_sug`},
          { name: `Decline`, value: `decline_sug`},
          { name: `Maybe`, value: `maybe_sug`},
        ]
      },
      {
        name: "comment",
        description: "State a little comment/reason you decided to accept/decline/maybe this suggestion",
        type: "STRING",
        required: true,
      },
    ], 
    run: async (client, interaction, args) => {
      let sug_id = interaction.options.getString('message');
      let sug_type = interaction.options.getString('type');
      let sug_comment = interaction.options.getString('comment');
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("MANAGE_GUILD")) return msg.edit(`⚠ You are missing the **"MANAGE_GUILD"** permission, therefore you cannot run this command`)
      
      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(!data) return msg.edit(`⚠ Hmm, this guild hasn't setup the suggestion system yet!`)
        let ch_sug = interaction.guild.channels.cache.get(data.Channel)
        if(!ch_sug) return msg.edit(`🤔 Uh oh, the suggestion channel which has been setup in our database cannot be found!`)
        let x;
        let msg_sug = await ch_sug.messages.fetch(`${sug_id}`).catch(() => {})
        if(msg_sug == null) return msg.edit(`🤔 Invalid suggestion ID! Make sure you provide a valid suggestion message id`)

        let new_typeColor
        let new_typeName
        let new_typeEmoji
        if(sug_type == 'accept_sug'){
          new_typeColor = client.config.color.green
          new_typeName = 'ACCEPTED'
          new_typeEmoji = '<:E_gflag:993828456255201336>'
        } else if(sug_type == 'decline_sug'){
          new_typeColor = client.config.color.red
          new_typeName = 'DECLINED'
          new_typeEmoji = '<:E_rflag:993828492850499596>'
        } else if(sug_type == 'maybe_sug'){
          new_typeColor = client.config.color.orange
          new_typeName = 'MAYBE'
          new_typeEmoji = '<:E_yflag:993828636270526605>'
        }
        
        let msg_data = msg_sug.embeds[0]
        msg_data.addFields([
          { name: `${new_typeEmoji} Reply [${new_typeName}] : ${interaction.user.username}`, value: `${sug_comment}` }
        ])
        msg_data.setColor(`${new_typeColor}`)
        

        let row = new MessageActionRow()
        .addComponents([
          new MessageButton()  
          .setEmoji("❓")
          .setLabel("Who Reacted?")
          .setStyle("PRIMARY")
          .setCustomId("who_voted")
        ])

        const emb2 = new MessageEmbed()
        .setTitle(`⭐ SUGGESTION REPLIED`)
        .setThumbnail(msg_data.author.iconURL)
        .setColor(client.config.color.main)
        .setDescription(`An admin **[${interaction.user.username}]** has replied to your suggestion [click here](https://discord.com/channels/${interaction.guild.id}/${data.Channel}/${sug_id}) to view their reply! \n\n _**TYPE: ${new_typeName}**_`)
        .setFooter(`Powered By Ave Development`, client.user.displayAvatarURL())

        let user_split = msg_data.author.name.replace(" | Suggestion", "")
        let user_dm = client.users.cache.find(x => x.tag == user_split)
        if(user_dm){
          user_dm.send({ embeds: [emb2] }).catch(() => {})
        }

        msg_sug.edit({ embeds: [msg_data]})
        return msg.edit(`⭐ Replied to the suggestion **[${sug_id}]**, feel free to view it here: <#${data.Channel}>`)
      })
    },
};
