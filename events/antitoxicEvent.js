const client = require(`../index`);
const Discord = require(`discord.js`);
const { MessageEmbed } = require('discord.js');
const Perspective = require('perspective-api-client');
const perspective = new Perspective({ apiKey: `AIzaSyA1Nvgv5_3pHbIQvaL81e0xDS8bTg3pv9I` }); // Private KEY
const model_ = require("../models/toxicsystem")
const model1 = require("../models/logging")
const model = require("../models/warnings")
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

client.on("messageCreate", async (message) => {
  if(!message.guild) return;
  if(!message.content) return;
  if(message.author.bot) return;
  if(message.member.permissions.has("MANAGE_MESSAGES")) return;
    try{
 model_.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;

   
   
   
  const result = await perspective.analyze(String(message.content));
  let obj = JSON.parse(JSON.stringify(result));
  const lvl = obj.attributeScores.TOXICITY.summaryScore.value * 100;
  if(lvl >= data.Value){
    message.delete().catch((e) => { message.reply(`<:E_cross:992431422554001498> I dont have PERMISSIONS to delete your message!`)})

    const embed = new MessageEmbed()
    .setAuthor(`${message.author.tag} - Warned for being Toxic`, message.author.displayAvatarURL())
      .setColor(`RED`)
    .setDescription(`<:E_cross:992431422554001498> Please don't be toxic to members!\n*Your message was \`${lvl}%\` toxic!*`)
    .setFooter(`${client.user.username} | Best Multi Bot of 2022\n↳ Powered by dsc.gg/avedev`, message.guild.iconURL())

    if(data.Action) {
     let this_user = message.member
     
     let xxx = "AntiToxic"
   if(data.Action == "timeout") {
     this_user.timeout(300000, `AUTOMOD| ${xxx}`)
   } else if(data.Action == "kick") {
     this_user.kick({ reason: `AUTOMOD| ${xxx}` })
   } else if(data.Action == "ban") {
     this_user.ban({ reason: `AUTOMOD| ${xxx}` })
   }
    }

    const row = new Discord.MessageActionRow()
    .addComponents([
      new Discord.MessageButton()
      .setLabel(`Read the 𝗙 𝗔 𝗤`)
      .setEmoji(`❓`)
      .setStyle(`SECONDARY`)
      .setCustomId(`antitoxic_faq`)
    ])
    message.channel.send({ content: `${message.author} | Extra-Action: **${data.Action||"none"}**`, embeds: [embed], components: [row]}).catch((e) => { })
    message.author.send({ embeds: [embed]}).catch(async(e)=> {})
    

    model1.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;
        guild = message.guild;
  if(!guild) return;

 logChannel = guild.channels.cache.get(data.Channel);

  const embed = new MessageEmbed()
  .setColor(`RED`)
  .setAuthor(`${message.author.tag} - Warned for being toxic`, message.author.displayAvatarURL())
    .addField(`Their message (CONTENT):`, `\`\`\`\n${message.content.replace(/`/g, "'") || "Possible Embed"}\n\`\`\``)
    .addField(`Message Toxic (LEVEL):`, `\`\`\`\n${lvl}%\n\`\`\``)
  .setFooter(`${client.user.username} | Best Multi Bot of 2022\n↳ Powered by dsc.gg/avedev`, guild.iconURL())
  
  loggingSend(logChannel, embed)
      })

    model.findOne({ Guild: message.guild.id, User: message.author.id }, async(err, data_) => {
      if(!data_){
        data_ = new model({
          Guild: message.guild.id,
          User : message.author.id,
          Array: [
            {
              mod   : client.user.id,
              reason: `Being Toxic - Warned by Auto-Mod`,
              data  : dayjs(new Date()).unix(),
              id    : new_set() + "-" + new_set() + "-" + new_set()
            }
          ]
        })
      } else {
        const object = {
          mod: client.user.id,
          reason: `Being Toxic - Warned by Auto-Mod`,
          data: dayjs(new Date()).unix(),
          id: new_set() + "-" + new_set() + "-" + new_set()
        }
        data_.Array.push(object)
      }
      data_.save()
    })
  }
})
      }catch(err){
    return;
  }
  })

client.on("messageUpdate", async (newMessage, oldMessage) => {
  if(!newMessage.guild) return;
  if(newMessage.author.bot) return;
  if(newMessage.member.permissions.has("MANAGE_MESSAGES")) return;
    try{
 model_.findOne({ Guild: newMessage.guild.id }, async(err, data) => {
    if(!data) return;

   
   
  const result = await perspective.analyze(String(newMessage.content));
  let obj = JSON.parse(JSON.stringify(result));
  const lvl = obj.attributeScores.TOXICITY.summaryScore.value * 100;
  if(lvl >= data.Value){
    newMessage.delete().catch((e) => { newMessage.reply(`<:E_cross:992431422554001498> I dont have PERMISSIONS to delete your message!`)})

    const embed = new MessageEmbed()
    .setAuthor(`${newMessage.author.tag} - Warned for being Toxic`, newMessage.author.displayAvatarURL())
      .setColor(`RED`)
    .setDescription(`<:E_cross:992431422554001498> Please don't be toxic to members!\n*Your message was \`${lvl}%\` toxic!*`)
    .setFooter(`${client.user.username} | Best Multi Bot of 2022\n↳ Powered by dsc.gg/avedev`, newMessage.guild.iconURL())
    if(data.Action) {
     let this_user = newMessage.member
     
     let xxx = "AntiToxic"
   if(data.Action == "timeout") {
     this_user.timeout(300000, `AUTOMOD| ${xxx}`)
   } else if(data.Action == "kick") {
     this_user.kick({ reason: `AUTOMOD| ${xxx}` })
   } else if(data.Action == "ban") {
     this_user.ban({ reason: `AUTOMOD| ${xxx}` })
   }
    }


    const row = new Discord.MessageActionRow()
    .addComponents([
      new Discord.MessageButton()
      .setLabel(`Read the 𝗙 𝗔 𝗤`)
      .setEmoji(`❓`)
      .setStyle(`SECONDARY`)
      .setCustomId(`antitoxic_faq`)
    ])
    newMessage.channel.send({ content: `${newMessage.author} | Extra-Action: **${data.Action||"none".toUpperCase()}**`, embeds: [embed], components: [row]}).catch((e) => { })
    newMessage.author.send({ embeds: [embed]}).catch(async(e)=> {})
    

    model.findOne({ Guild: newMessage.guild.id, User: newMessage.author.id }, async(err, data_) => {
      if(!data_){
        data_ = new model({
          Guild: newMessage.guild.id,
          User : newMessage.author.id,
          Array: [
            {
              mod   : client.user.id,
              reason: `Being Toxic - Warned by Auto-Mod`,
              data  : dayjs(new Date()).unix(),
              id    : new_set() + "-" + new_set() + "-" + new_set()
            }
          ]
        })
      } else {
        const object = {
          mod: client.user.id,
          reason: `Being Toxic - Warned by Auto-Mod`,
          data: dayjs(new Date()).unix(),
          id: new_set() + "-" + new_set() + "-" + new_set()
        }
        data_.Array.push(object)
      }
      data_.save()
    })
  }
})
      }catch(err){
    return;
  }
  })
client.on("interactionCreate", async(interaction) => {
  if(interaction.customId == "antitoxic_faq") {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    model_.findOne({ Guild: interaction.guild.id }, async(err, data) => {
    
    const embed = new MessageEmbed()
    .setColor(`BLUE`)
    .setAuthor(`${client.user.username} | Anti-Toxic | 𝗙 𝗔 𝗤`, client.user.displayAvatarURL())
      .addField("`⭐` **How it works? What it does:**", `>>> The Anti-Toxic System (coded by ave) uses a perspective API to scan your Discord-Message, looking for any sign of toxicness.\nIf the bot thinks that is a bit toxic, it sads __"X"__ amount of points to the percent.\nIf the total percent is over the __"set"__ then it takes action.\n*Overall, this system is to keep your server clan and family friendly!*`)
      .addField("`💢` **What is the __Extra-Action__ all about??**", `\`\`\`\nThe "Extra-Action" is a seperate action the bot does to the user.\nUse the slash command to setup the "Extra-Action"\n\`\`\``)
      if(data) {
    embed.addField("`⚙️` **Max-Percent-of-Toxic __Allowed__:**", `\`\`\`\n${data.Value}%\n\`\`\``)
      } else {
        embed.addField("`⚙️` **Max-Percent-of-Toxic __Allowed__:**"`\`\`\`\n:x: Seems the Anti-Toxic System is DISABLED!\n\`\`\``)
      }
      embed.setFooter(`${client.user.username} | Best Multi Bot of 2022\n↳ Powered by dsc.gg/avedev`, interaction.guild.iconURL())

                   interaction.followUp({ embeds: [embed], ephemeral: true})
    })
  }
})
async function loggingSend(channel, embed) {
  if(!channel) return;
  let x = dayjs(new Date()).unix();
  channel.send({ content: `<:icons_warning:1018765521350561813> __**Anti-Toxic Log Information:**__ <:icons_warning:1018765521350561813>\n> Taken at: <t:${x}:R> *(<t:${x}:D>)*`, embeds: [embed||null] }).catch(async() => {});
}