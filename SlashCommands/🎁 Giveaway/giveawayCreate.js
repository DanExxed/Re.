const Discord = require("discord.js")
const ms = require("ms")
module.exports = {
  name: 'giveaway-create',
  description: '🎁 Start a giveaway',
  category: "giveaway",
  options: [
    {
      name: 'duration',
      description: 'How long the giveaway should last for. Example values: 1h, 1d',
      type: 'STRING',
      required: true
    },
    {
      name: 'winners',
      description: 'How many winners the giveaway should have',
      type: 'INTEGER',
      required: true
    },
    {
      name: 'prize',
      description: 'What the prize of the giveaway should be',
      type: 'STRING',
      required: true
    },
    {
      name: 'channel',
      description: 'The channel to start the giveaway in',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'bonusrole',
      description: 'Role which would recieve bonus entries',
      type: 'ROLE',
      required: false
    },
    {
      name: 'bonusamount',
      description: 'The amount of bonus entries the role will recieve',
      type: 'INTEGER',
      required: false
    },
    {
      name: 'invite',
      description: 'Invite of the server you want to add as giveaway joining requirement',
      type: 'STRING',
      required: false
    },
    {
      name: 'role',
      description: 'Role you want to add as giveaway joining requirement',
      type: 'ROLE',
      required: false
    },
  ],

  run: async (client, interaction) => {

    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.followUp({
        content: ':x: You need to have the manage messages permissions to start giveaways.',
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayDuration = interaction.options.getString('duration');
    const giveawayWinnerCount = interaction.options.getInteger('winners');
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isText()) {
      return interaction.followUp({
        content: ':x: Please select a text channel!',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.followUp({
      content: ':x: Please select a valid duration!',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.followUp({
        content: ':x: Please select a valid winner count! greater or equal to one.',
      })
    }

    const bonusRole = interaction.options.getRole('bonusrole')
    const bonusEntries = interaction.options.getInteger('bonusamount')
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invite')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.followUp({
          content: `:x: You must specify how many bonus entries would ${bonusRole} recieve!`,
          ephemeral: true
        });
      }
    }


    
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
        return interaction.followUp({
          embeds: [{
            color: "#ff6666",
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Server Check!",
            url: "https://discord.gg/JmmdffruHN",
            description:
              "Woah woah woah! I see a new server! are you sure I am in that? You need to invite me there to set that as a requirement! 😳",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Server Check"
            }
          }]
        })
      }
    }


    // start giveaway
let bnRole;
    
    if(bonusRole) {
       bnRole = `🎁 **GIVEAWAY STARTED** 🎁\n>>> *Bonus Entry Roles:*\n**\`${bonusRole.name}\` : \`${bonusEntries}\`**`
    } else {
       bnRole = "🎁 **GIVEAWAY STARTED** 🎁"
    }

    let bnRole_e;
    
    if(bonusRole) {
       bnRole_e = `🎁 **GIVEAWAY ENDED** 🎁\n>>> *Bonus Entry Roles:*\n**\`${bonusRole.name}\` : \`${bonusEntries}\`**`
    } else {
       bnRole_e = "🎁 **GIVEAWAY ENDED** 🎁"
    }
    
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      time: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: parseInt(giveawayWinnerCount),
      // BonusEntries If Provided
      bonusEntries: [
        {
          // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],
      // Messages
      
      messages: {
        giveaway:
    `${bnRole}`,
  giveawayEnded:
    `${bnRole_e}`,
  drawing:  `*React with 🎁 to participate!*\n\`⏲️\` Ends: **{timestamp}**\n\`👑\` Hosted by: ${interaction.user}\n\`👤\` WinnersCount: ${parseInt(giveawayWinnerCount)}`,
  inviteToParticipate: ``,
  winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "⚡ Powered by Asura Hangout",
  noWinner: `*Giveaway cancelled, no valid participations.*\n\`👑\` Hosted by: ${interaction.user}\n\`👤\` WinnersCount: ${parseInt(giveawayWinnerCount)}`,
  hostedBy: "\`👑\` Hosted by: {this.hostedBy}",
  winners: `*~~React with 🎁 to participate!~~*\n\`⏲️\` Ended: **Now**\n\`👑\` Hosted by: ${interaction.user}\n\`👤\` Winners:`,
  endedAt: "Ended at"
      },
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.followUp({
      content:
        `🎉 Giveaway started in ${giveawayChannel}!`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new Discord.MessageEmbed()
        .setAuthor(`⭐ Bonus Entries Alert!`)
        .setDescription(
          `**${bonusRole}** Has **${bonusEntries}** Extra Entries in this giveaway!`
        )
        .setColor("GOLD")
        .setTimestamp();
      //giveawayChannel.send({ embeds: [giveaway] });
    }

  }

};