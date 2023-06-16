const client = require('../index.js')
const ms = require("ms");
const model = require("../models/antispam")
const Discord = require(`discord.js`)
const usercollection = new Map();
const spam_time = 5000;
const spam_timer = 10000;
let spam_limit;

client.on('messageCreate', async(message) => {
    if(message.author.bot || !message.guild) return;
  if(message.member.permissions.has("MANAGE_MESSAGES")) return;
  model.findOne({Guild:message.guild.id}, async(err, data) => {
    if(!data) return;

    if(data.Limit) {
      spam_limit = data.Limit
    } else {
      spam_limit = 7
    }

    
    if(usercollection.has(message.author.id)) {
      const userdata = usercollection.get(message.author.id);
      const { lastMessage, timer } = userdata;
      const spam_timediff = message.createdTimestamp - lastMessage.createdTimestamp;
      let msgs = userdata.msgs;

      if(spam_timediff > spam_time) {
        clearTimeout(timer)
        userdata.msgs = 1
        userdata.lastMessage = message;
        userdata.timer = setTimeout(() => {
          usercollection.delete(message.author.id);
        }, spam_timer)
        usercollection.set(message.author.id, userdata)
      } else {
        ++msgs;
        if(parseInt(msgs) == spam_limit) {
          const embed = new Discord.MessageEmbed()
          .setColor(`RED`)
          .setAuthor(`${message.author.tag} - Timedout for Spamming`, message.author.displayAvatarURL())
          .setDescription(`<:E_cross:992431422554001498> **Please don't spam! I have timed you out! Don't do it again!**`)
          .setFooter(`${client.user.username} | Best Multi Bot of 2022\n↳ Powered by dsc.gg/avedev`, message.guild.iconURL())
          message.channel.send({ content: `${message.author}`, embeds: [embed] })
          let user = client.users.cache.get(message.author.id)
          message.member.timeout(300000, `AUTOMOD| Spam`)
          message.author.send({ embeds: [embed] })
          message.channel.bulkDelete(spam_limit);
        } else {
          userdata.msgs = msgs;
          usercollection.set(message.author.id, userdata);
        }
      }
    } else {
      let tm = setTimeout(() => {
        usercollection.delete(message.author.id);
      }, spam_timer);
      usercollection.set(message.author.id, {msgs: 1,lastMessage: message,timer: tm})
    }
  })
})
