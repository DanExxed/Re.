const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment")

module.exports = {
    name: "serverinfo",
    description: "Gets the server's information",
    type: 'CHAT_INPUT',
    category: "Info",
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);
      const ar = `<:E_arrow:992026718149824624>`
let myGuild = interaction.guild; 
      interaction.guild.owner = await interaction.guild.fetchOwner().then(m => m.user).catch(() => {})
      const members = interaction.guild.members.cache;
  let memberCount = myGuild.memberCount;
      let boosts = interaction.guild.premiumSubscriptionCount;
      var boostlevel = 0;
      if (boosts >= 2) boostlevel = "1";
      if (boosts >= 7) boostlevel = "2";
      if (boosts >= 14) boostlevel = "3 / ∞";
      let maxbitrate = 96000;
      if (boosts >= 2) maxbitrate = 128000;
      if (boosts >= 7) maxbitrate = 256000;
      if (boosts >= 14) maxbitrate = 384000;
      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`<:E_member:991887198758649996> ServerInfo of ${interaction.guild.name}`)
        .addField(`${ar} Server Owner:`, `${interaction.guild.owner}`, true)
        .addField(`${ar} Server Creation:`, `\`${moment(interaction.guild.createdTimestamp).format("DD/MM/YYYY")}\` \`${moment(interaction.guild.createdTimestamp).format("hh:mm:ss")}\``, true)
        .addField(`${ar} Total Members:`, `\`${memberCount}\`/\`${interaction.guild.maximumMembers}\``, true)
        .addField(`${ar} Total Bots:`, `\`${interaction.guild.members.cache.filter(member => member.user.bot).size}\``, true)
        .addField(`${ar} Total Users:`, `\`${interaction.guild.members.cache.filter(member => !member.user.bot).size}\``, true)
        .addField(`${ar} Text-Channels:`, `\`${interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size}\``, true)
        .addField(`${ar} Voice-Channels:`, `\`${interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size}\``, true)
        .addField(`${ar} Rules Channel:`, `${interaction.guild.rulesChannel || `\`None Set\``}`, true)
        .addField(`${ar} Updates Channel:`, `${interaction.guild.publicUpdatesChannel || `\`None Set\``}`, true)
        .addField(`${ar} Afk Channel:`, `\`${interaction.guild.afkChannel || `\`None Set\``}\``, true)
        .addField(`${ar} Verification level:`, `\`${interaction.guild.verificationLevel}\``, true)
        
        emb.addField(`${ar} Server vanity:`, `${`https://discord.gg/`+interaction.guild.vanityURLCode || `\`None Set\``}`, true)
        
        .addField(`${ar} Server Boosts:`, `\`${interaction.guild.premiumSubscriptionCount}\``, true)
        .addField(`${ar} Server Boost-Level:`, `\`${boostlevel}\``, true)
          .setImage(interaction.guild.bannerURL({size: 4096}))
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
      .setFooter(client.config.footer) 

      
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb] });
      }, 500);
    },
};
