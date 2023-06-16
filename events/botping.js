
const client = require("../index");
const { MessageEmbed } = require('discord.js')
client.on('messageCreate', async(message) => {
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){
    return message.reply({ embeds:[
        new MessageEmbed()
    .setTitle(`Huh? I got pinged?`)
    .setDescription(`**:wave: Hello __${message.author.username}__, I am in slash commands**\n ↳  *Use \`/help\` to view all my commands!*`).setColor("BLUE")]  })
  }

})