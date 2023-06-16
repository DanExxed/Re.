const client = require("../index");
const Sugesstion = require(`../models/suggestion`);
const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const config = client.config;
const model = require("../models/suggestion")
const model2 = require("../models/sugchannel")

client.on("messageCreate", async (message) => {
  if(!message.guild) return;
  model2.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return
    if (message.channel.id !== data.Channel || message.author.bot) return;
    SendInChannel();
/* ☂️ SUGGESTIONS BOT ☂️    */
/* Coded by Insidious */
/* Website: avedevelopment.tk      */
    function SendInChannel() {
      const channel = data.Channel
      if (!channel) return;
      let files = null;
        //add images if added (no videos possible)
        if (message.attachments.size > 0){
            if (message.attachments.every(attachIsImage)) {
                files = url
            }
        }

        function attachIsImage(msgAttach) {
            url = msgAttach.url || null;
            imagename = msgAttach.name || `Unknown`;
            return url.indexOf(`png`, url.length - 3 ) !== -1 ||
                url.indexOf(`jpeg`, url.length - 4 ) !== -1 ||
                url.indexOf(`gif`, url.length - 3) !== -1 ||
                url.indexOf(`jpg`, url.length - 3) !== -1;
        }
      message.delete()
      client.channels.cache.get(data.Channel).send({
        embeds: [
          new MessageEmbed()
          .setAuthor({ name: `${message.author.tag} | Suggestion`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
          .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
          .setDescription(`>>> ${message.content || `\`No Message\``}`)
          .addFields([
            { name: "👍 **__Up Votes__:**", value: "```0 Votes```", inline: true },
            { name: "👎 **__Down Votes__:**", value: "```0 Votes```", inline: true },
          ])
          .setImage(files)
          .setFooter({ text: "Want To Suggest / Feedback Something? Simply Type In This Channel!\n🔷 On Shard: "+message.guild.shardId+"", iconURL: `${client.user.displayAvatarURL()}` })
          .setColor(client.config.color.main),
        ],
        components: [new MessageActionRow().addComponents(new MessageButton().setLabel(`0`).setEmoji("<:a_upvote:1014424682449096744>").setCustomId("vote").setStyle("SECONDARY"), new MessageButton().setLabel(`0`)  .setEmoji("<:a_downvote:1014424638232731648>").setCustomId("unvote").setStyle("SECONDARY"), new MessageButton()  .setEmoji("❓").setLabel("Who voted?").setStyle("PRIMARY").setCustomId("who_voted"))],
        }).then((m) => { new model({ MessageId: m.id }).save() });
      }
  })
})
/* ☂️ SUGGESTIONS BOT ☂️    */
/* Coded by Insidious */
/* Website: avedevelopment.tk      */
client.on("interactionCreate", async (interaction) => {
 if (!interaction.isButton()) return;
 switch (interaction.customId) {
  case "vote":
   {
     const voted2 = await AlreadyDownVoted(interaction.message.id, interaction.user.id)
     if(voted2) {
       let upvotes = parseInt(interaction.message.embeds[0].fields[0].value.split(" Votes").join("").split("`").join(""));
    let downvotes = parseInt(interaction.message.embeds[0].fields[1].value.split(" Votes").join("").split("`").join(""));
    upvotes++;
    downvotes--;
const embed = interaction.message.embeds[0]
    embed.fields[0].key = "👍 **__Up Votes__:**";
    embed.fields[0].value = `\`\`\`${upvotes} Votes\`\`\``;
    embed.fields[1].key = "👎 **__Down Votes__:**";
    embed.fields[1].value = `\`\`\`${downvotes} Votes\`\`\``;
    
    interaction.message.edit({
     embeds: [
      embed],
     components: [new MessageActionRow().addComponents(new MessageButton().setLabel(`${upvotes}`).setEmoji("<:a_upvote:1014424682449096744>").setCustomId("vote").setStyle("SECONDARY"), new MessageButton().setLabel(`${downvotes}`).setEmoji("<:a_downvote:1014424638232731648>").setCustomId("unvote").setStyle("SECONDARY"), new MessageButton().setEmoji("❓").setLabel("Who voted?").setStyle("PRIMARY").setCustomId("who_voted"))],
    });
    await UpdateUpvotesDb(interaction.message.id, interaction.user)
    await RemoveDownvotesDb(interaction.message.id, interaction.user)
     }
     const voted = await AlreadyUpVoted(interaction.message.id, interaction.user.id)
     if(voted) return interaction.deferUpdate().catch(() => {});
    let upvotes = parseInt(interaction.message.embeds[0].fields[0].value.split(" Votes").join("").split("`").join(""));
    let downvotes = parseInt(interaction.message.embeds[0].fields[1].value.split(" Votes").join("").split("`").join(""));
    upvotes++;
    const embed = interaction.message.embeds[0]
    embed.fields[0].key = "👍 **__Up Votes__:**";
    embed.fields[0].value = `\`\`\`${upvotes} Votes\`\`\``;
    embed.fields[1].key = "👎 **__Down Votes__:**";
    embed.fields[1].value = `\`\`\`${downvotes} Votes\`\`\``;
    
    interaction.message.edit({
     embeds: [
      embed],
     components: [new MessageActionRow().addComponents(new MessageButton().setLabel(`${upvotes}`).setEmoji("<:a_upvote:1014424682449096744>").setCustomId("vote").setStyle("SECONDARY"), new MessageButton().setLabel(`${downvotes}`).setEmoji("<:a_downvote:1014424638232731648>").setCustomId("unvote").setStyle("SECONDARY"), new MessageButton().setEmoji("❓").setLabel("Who voted?").setStyle("PRIMARY").setCustomId("who_voted"))],
    });
    await UpdateUpvotesDb(interaction.message.id, interaction.user)
    interaction.deferUpdate().catch(() => {});
   }
   break;
   /* ☂️ SUGGESTIONS BOT ☂️    */
   /* Coded by Discord.gg/Azury */
   /* Website: Azury.live       */
  case "unvote":
   {
     const voted2 = await AlreadyUpVoted(interaction.message.id, interaction.user.id)
     if(voted2) {
       let upvotes = parseInt(interaction.message.embeds[0].fields[0].value.split(" Votes").join("").split("`").join(""));
    let downvotes = parseInt(interaction.message.embeds[0].fields[1].value.split(" Votes").join("").split("`").join(""));
    downvotes++;
    upvotes--;
    const embed = interaction.message.embeds[0]
    embed.fields[0].key = "👍 **__Up Votes__:**";
    embed.fields[0].value = `\`\`\`${upvotes} Votes\`\`\``;
    embed.fields[1].key = "👎 **__Down Votes__:**";
    embed.fields[1].value = `\`\`\`${downvotes} Votes\`\`\``;
    
    interaction.message.edit({
     embeds: [
      embed],
     components: [new MessageActionRow().addComponents(new MessageButton().setLabel(`${upvotes}`).setEmoji("<:a_upvote:1014424682449096744>").setCustomId("vote").setStyle("SECONDARY"), new MessageButton().setLabel(`${downvotes}`).setEmoji("<:a_downvote:1014424638232731648>").setCustomId("unvote").setStyle("SECONDARY"), new MessageButton().setEmoji("❓").setLabel("Who voted?").setStyle("PRIMARY").setCustomId("who_voted"))],
    });
    await UpdateDownvotesDb(interaction.message.id, interaction.user)
    await RemoveUpvotesDb(interaction.message.id, interaction.user)
     } 
     const voted = await AlreadyDownVoted(interaction.message.id, interaction.user.id)
     if(voted) return interaction.deferUpdate().catch(() => {});
    let upvotes = parseInt(interaction.message.embeds[0].fields[0].value.split(" Votes").join("").split("`").join(""));
    let downvotes = parseInt(interaction.message.embeds[0].fields[1].value.split(" Votes").join("").split("`").join(""));
    downvotes++;
    const embed = interaction.message.embeds[0]
    embed.fields[0].key = "👍 **__Up Votes__:**";
    embed.fields[0].value = `\`\`\`${upvotes} Votes\`\`\``;
    embed.fields[1].key = "👎 **__Down Votes__:**";
    embed.fields[1].value = `\`\`\`${downvotes} Votes\`\`\``;
    
    interaction.message.edit({
     embeds: [
      embed],
     components: [new MessageActionRow().addComponents(new MessageButton().setLabel(`${upvotes}`).setEmoji("<:a_upvote:1014424682449096744>").setCustomId("vote").setStyle("SECONDARY"), new MessageButton().setLabel(`${downvotes}`).setEmoji("<:a_downvote:1014424638232731648>").setCustomId("unvote").setStyle("SECONDARY"), new MessageButton().setEmoji("❓").setLabel("Who voted?").setStyle("PRIMARY").setCustomId("who_voted"))],
    });
    await UpdateDownvotesDb(interaction.message.id, interaction.user)
    interaction.deferUpdate().catch(() => {});
   }break;
  case "who_voted":
   {
    let upvotes = parseInt(interaction.message.embeds[0].fields[0].value.split(" Votes").join("").split("`").join(""));
    let downvotes = parseInt(interaction.message.embeds[0].fields[1].value.split(" Votes").join("").split("`").join(""));
    const db = await Sugesstion.findOne({ MessageId: interaction.message.id });
    const upvoters = await WhoVotedUp(interaction.message.id)
    const downvoters = await WhoVotedDown(interaction.message.id)
    interaction.reply({
     embeds: [
      new MessageEmbed()
       .setTitle("❓ **Who reacted to this suggestion?** ❓")
       .addFields([
        {
         name: `👍 Upvotes: ${upvotes}`,
         value: `${upvoters}`,
         inline: true,
        },
        {
         name: `👎 Downvotes: ${downvotes}`,
         value: `${downvoters}`,
         inline: true,
        },
       ])
       .setFooter("Powered by Ave Development\n🔷 On Shard: "+interaction.guild.shardId+"", interaction.guild.iconURL())
       .setColor(client.config.color.main),
     ],
     ephemeral: true,
    });
   }break;
 }
});

// 💾 DATABASES 💾

async function UpdateUpvotesDb(findkey, updatekey) {
  await Sugesstion.findOneAndUpdate({MessageId: findkey,},{$push: {Up: '<@!'+ updatekey + '>'},});
}
async function UpdateDownvotesDb(findkey, updatekey) {
  await Sugesstion.findOneAndUpdate({MessageId: findkey,},{$push: {Down: '<@!'+ updatekey + '>' },});
}
async function RemoveUpvotesDb(findkey, updatekey) {
  await Sugesstion.findOneAndUpdate({MessageId: findkey,},{$pull:{Up: '<@!'+ updatekey + '>'},});
}
async function RemoveDownvotesDb(findkey, updatekey) {
  await Sugesstion.findOneAndUpdate( { MessageId: findkey, }, { $pull: { Down: '<@!'+ updatekey + '>' }, });
}
async function AlreadyUpVoted(key, userid){
  const findkey = '<@!' + userid + '>';
  const db = await Sugesstion.findOne({MessageId: key});
  if(db.Up.includes(findkey)){ return true } else { return false }
}
async function AlreadyDownVoted(key, userid){
  const findkey = '<@!' + userid + '>'
  const db = await Sugesstion.findOne({MessageId: key});
  if(db.Down.includes(findkey)){ return true } else { return false }
}
async function WhoVotedUp(key){
  const db = await Sugesstion.findOne({MessageId: key});
  if(!db.Up.length){ return "No UpVotes" } else { return db.Up.join('\n') }
}
async function WhoVotedDown(key){
  const db = await Sugesstion.findOne({MessageId: key});
  if(!db.Down.length){ return "No DownVotes" } else { return db.Down.join('\n') }
}

/* ☂️ SUGGESTIONS BOT ☂️    */
/* Coded by Insidious */
/* Website: avedevelopment.tk       */