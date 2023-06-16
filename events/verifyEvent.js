const client = require("../index");
const { MessageEmbed, Collection, MessageAttachment, MessageButton, MessageActionRow } = require("discord.js");
const f = require("node-fetch");
const { registerFont, createCanvas } = require('canvas');
const model = require("../models/verifysystem");
const dayjs = require("dayjs");
const model1 = require("../models/logging");
const wait = require('util').promisify(setTimeout);

client.on("interactionCreate", async (interaction) => {
  let verify_text1;
  let verify_text;
  let Guild;
  let user;
  let Role;

  model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
    if(!data) return;

    if(interaction.customId == "verify_start") {
       interaction.reply({ 
        content: `<a:a_loading:1019257415176290415> *Scanning for verification process...*`, 
        ephemeral: true 
      })
      
      await wait(1000);
      
      if(interaction.member.roles.cache.has(data.Role)) return interaction.editReply({ 
        content: `<:E_cross:992431422554001498> You are already verified for **${interaction.guild.name}**!`, 
        ephemeral: true 
      })

      Role = data.Role;
      user = interaction.user;
      Guild = interaction.guild;

    let kod1 = makeid(6);
    let kod2 = makeid(6);
    let kod3 = makeid(6);
    let kod4 = makeid(6);

      
      let btn1 = new MessageButton()
    .setLabel(`Code: `+kod1)
    .setStyle("PRIMARY")
    .setCustomId(`verifyid_`+kod1)
      
    let btn2 = new MessageButton()
    .setLabel(`Code: `+kod2)
    .setStyle("PRIMARY")
    .setCustomId(`verifyid_`+kod2)
      
    let btn3 = new MessageButton()
    .setLabel(`Code: `+kod3)
    .setStyle("PRIMARY")
    .setCustomId(`verifyid_`+kod3)
    
    let btn4 = new MessageButton()
    .setLabel(`Code: `+kod4)
    .setStyle("PRIMARY")
    .setCustomId(`verifyid_`+kod4)

      let sorgu = new MessageActionRow()
      .addComponents([
        btn1, btn2, btn3, btn4
      ].sort(() => Math.random()-0.5))

    
      

      const width = 400
    const height = 125
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')
    await registerFont('events/font.ttf', { family: 'vCodes' })
    context.fillRect(0, 0, width, height)
    context.font = 'bold 60pt vCodes'
    context.textAlign = 'center'
    context.fillStyle = '#fff'
    context.fillText(kod1, 200, 90)
    const attachment = new MessageAttachment(canvas.toBuffer(), 'captcha.png'); 

      

      const embed = new MessageEmbed()
      .setColor(`BLUE`)
      .setAuthor(`${interaction.user.tag} - Verification Process`, interaction.user.displayAvatarURL())
      .setTitle(`Select the code button that is the same as the picture!`)
      .setImage(`attachment://captcha.png`)

      interaction.editReply({ content: ` `, embeds: [embed], files: [attachment], components: [ sorgu ], ephemeral: true }).then(async msg => {
		
		const collector = await msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 300000 });
		  collector.on('collect', async b => {
        if(b.customId == `verifyid_${kod1}`) {
    const embed = new MessageEmbed()
      .setColor(`GREEN`)
      .setAuthor(`${b.user.tag} - Verification PASSED`, b.user.displayAvatarURL())
      .setTitle(`<:E_yes:992431126339657758> You passed the Verification Test!`)
              .setImage(`https://media.discordapp.net/attachments/938419784368943114/1020214184945922048/images.jpg`)
      .setFooter(`You now will have access to ${Guild.name}!`)
            interaction.editReply({ content: ` `, embeds: [embed], components: [], files: [] })
            b.member.roles.add(Role).then(async(r)=>{
              b.reply({ content:`👍 The role (<@&${Role}>) was added to you!`, 
        ephemeral: true })
            })
  } else {
    const embed = new MessageEmbed()
            .setColor(`RED`)
            .setAuthor(`${b.user.tag} - Verification FAILED`, b.user.displayAvatarURL())
            .setTitle(`<:E_cross:992431422554001498> That was wrong! Please try again.`)
            .setDescription(`The correct answer was: \`${kod1}\`!`)
              .setImage(`https://media.discordapp.net/attachments/938419784368943114/1020214184945922048/images.jpg`)
            .setFooter(`Press the Verify button again to re-try.`)
          interaction.editReply({ content: ` `, embeds: [embed], components: [], files: [] })
          b.reply({ content: `👎 Please retry the verification!`, 
        ephemeral: true })
  }
      })
      })
  }

})
})
async function loggingSend(channel, embed) {
  if(!channel) return;
  let x = dayjs(new Date()).unix();
  channel.send({ content: ` <:icons_warning:1018765521350561813> __**Verification Log Information:**__ <:icons_warning:1018765521350561813>\n> Taken at: <t:${x}:R> *(<t:${x}:D>)*`, embeds: [embed||null] }).catch(async() => {});
}

function makeid(length) {
    var result = '';
    var characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}