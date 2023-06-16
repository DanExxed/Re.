const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../index");
const moment = require("moment");
const DB = require("../models/welcomesystem");

client.on("guildMemberAdd", async (member) => {
  const { user, guild } = member;
  let Data = await DB.findOne({ Guild: guild.id }).catch((err) => {});
  if (!Data) return;

  const channel = guild.channels.cache.get(Data.Channel);
  if (!channel) return;

  const membercountbutton = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId(`1`)
      .setStyle(`SECONDARY`)
      .setLabel(`${member.guild.memberCount} members`)
      .setEmoji("1006785164799647744")
      .setDisabled(true)
  );

  channel.send({ content:`👋 <@${member.user.id}>`,
    embeds: [

new MessageEmbed()

.setColor(client.config.color.main)

.setDescription(`👋 **Welcome**, <@${member.user.id}> to **${member.guild.name}**\n\n<:a_follow:1017001514918760469> **Account Created:**\n<t:${parseInt(member.user.createdTimestamp / 1000)}:R>\n<:a_member:1012280658585993306> **User Id:**\n${member.user.id}`)

.setImage(`https://media.discordapp.net/attachments/938419784368943114/1016956611547369482/IMG_20220907_114922.jpg`)],
    components: [membercountbutton],
  });
});
