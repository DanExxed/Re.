  const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const hastebin = require('hastebin-gen');

module.exports = {
    name: "eval",
   nodefer: false,
  category: "owner",
    description: "Evalulate a peice of code",
    type: 'CHAT_INPUT',
    options: [
        {
          name: "code",
          description: "Code to eval",
          type: "STRING",
          required: true,
        },
    ],
    run: async (client, interaction, args) => {
      const codeToEval = interaction.options.getString('code')
      let msg = await interaction.followUp(`Evalulating..`)
    
      if(!client.config.developers.includes(interaction.user.id)) return msg.edit(`?? This command is locked to owners only!`)
      
      String.prototype.replaceAll = function (search, replacement) {
        return this.replace(RegExp(search, 'gi'), replacement);
      };

      client.clean = text => {
        if (typeof text !== 'string') {
          text = require('util').inspect(text, { depth: 0 });
        }
        text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replaceAll(client.token, 'never gonna give you up, never gonna let you down')
        return text;
      };
      
      try {
        const evaled = client.clean(eval(codeToEval));      
        if (evaled.length < 800) {
          msg.edit({ content: `\`\`\`xl\n${evaled}\n\`\`\`` })
        } else {
          await hastebin(evaled, "js").then(r => {
            msg.edit({ content:   `\`\`\`xl\n${r}\n\`\`\`` })
          });
        }
      } catch (err) {
        msg.edit({ content: `\`\`\`xl\n${err}\n\`\`\`` });
      }
    },
};


