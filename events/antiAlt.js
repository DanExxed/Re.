const model = require("../models/antialt")
const { MessageEmbed, Collection, MessageAttachment } = require("discord.js")
const client = require("../index")
const model1 = require("../models/logging")
const day = require("dayjs");
let time;

client.on("guildMemberAdd", async(member) => {
  model.findOne({Guild:member.guild.id}, async(err, data) => {
    if(!data) return;

    if(data.Bots == true && member.user.bot) return;

    let difference = day(new Date()).diff(member.user.createdAt, 'day')
    time = data.Days;
    if(difference < data.Days){
      const embed = new MessageEmbed()
      .setColor(`RED`)
      .setAuthor(`${member.user.tag} - Account Age too Young`, member.user.displayAvatarURL())
      .setTitle(`<:E_cross:992431422554001498> Your account is too young for **${member.guild.name}**!`)
      .setDescription(`Your account age is \`${difference}\` days old, but the requirement is \`${data.Days}\` days!`)
        .setImage(`https://media.discordapp.net/attachments/938419784368943114/1020214184945922048/images.jpg`)
      .setFooter(`Please rejoin whenever you meet the requirements!`)
      member.send({ embeds: [embed] }).catch(()=>{})
      member.kick({reason:`Account age: ${difference}, needed to be above ${data.Days}`}).catch((e) => member.send({ content: `<:E_cross:992431422554001498> I coudln't kick you! This means I dont have permissions.` }))
      model1.findOne({ Guild: member.guild.id }, async(err, data) => {
    if(!data) return;
        guild = member.guild;
  if(!guild) return;

 logChannel = guild.channels.cache.get(data.Channel);

  const embed = new MessageEmbed()
  .setColor(`BLUE`)
  .setAuthor(`${member.user.tag} - Kicked by Anti-Alt`, member.displayAvatarURL())
    .addField(`Account Creation Date (IN DAYS):`, `\`${difference}\` days ago.`)
    .addField(`Account Age Requirement (IN DAYS):`, `\`${time}\` days.`)
  .setFooter(`${client.user.username} | Best Multi Bot of 2022\n↳ Powered by dsc.gg/avedev`, guild.iconURL())
  
  loggingSend(logChannel, embed)
      })
    }
  })
})
async function loggingSend(channel, embed) {
  if(!channel) return;
  let x = dayjs(new Date()).unix();
  channel.send({ content: `<:icons_warning:1018765521350561813> __**Anti-Alt Log Information:**__ <:icons_warning:1018765521350561813>\n> Taken at: <t:${x}:R> *(<t:${x}:D>)*`, embeds: [embed||null] }).catch(async() => {});
}