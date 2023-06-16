const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
const client = require("../index");
const DB = require("../models/leavesystem");


client.on("guildMemberRemove", async (member) => {
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

  channel.send({ content: `Left  <@${member.user.id}>`,
    embeds: [

new MessageEmbed()

.setColor(client.config.color.main)

.setDescription(`👋 Goodbye, <@${member.user.id}> left **${member.guild.name}**\n\n<:a_follow:1017001514918760469> **Account Created:**\n<t:${parseInt(member.user.createdTimestamp / 1000)}:R>\n<:a_member:1012280658585993306> **User Id:**\n${member.user.id}`)],
    components: [membercountbutton],
  });
});
