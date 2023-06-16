const {
	MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu
} = require("discord.js")

module.exports = {
    name: "help",
    category: "Info",
    description: "See all of my commands",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      
      let button_back = new MessageButton().setStyle('SECONDARY').setCustomId('1').setEmoji("942518778414121050").setLabel(``)
        let button_home = new MessageButton().setStyle('SECONDARY').setCustomId('2').setEmoji("942518778091163759").setLabel(``)
        let button_forward = new MessageButton().setStyle('SECONDARY').setCustomId('3').setEmoji('942518778216980540') .setLabel(``)
        let button_tutorial = new MessageButton().setStyle('LINK').setEmoji("942518778225393704").setLabel("Discord").setURL("https://discord.avedevelopment.tk")
  /*      let menuOptions = [
          {
            label: "Overview",
            value: "Overview",
            emoji: "<:E_question:992385172379029614>",
            description: "My Overview"
          },
          {
            label: "Information",
            value: "Information",
            emoji: "<a:info11:945244079908864000>",
            description: "Information commands"
          },
          {
              label: "Activity",
              value: "welcome",
              emoji: "<:a_statistics:1015582709772464148>",
              description: "view the welcome module"
           },
          {
            label: "Fun",
            value: "Minigames",
            emoji: "<a:E_Minigame:949181808791146526>",
            description: "Commands to use fun commands"
          },
          {
            label: "Giveaway",
            value: "Nsfw",
            emoji: "<:giveaway:1011945724696596531>",
            description: "Giveaway Commands"
          },
          {
            label: "Ticket",
            value: "Config",
            emoji: "<:a_ticket:1009810761087983696>",
            description: "View the ticket module"
          },
         {
                label: "Setup",
                value: "setup",
                emoji: "<a:config12:945244082182160456>",
                description: "view the setup module"
            },
           {
               label: "Moderation",
               value: "mod",
               emoji: "<:emoji_4:945126945560100884>",
               description: "view the moderation module"
               },
          {
            label: "Utility",
            value: "Suggest",
            emoji: "<a:thunder:1012371291459825765>",
            description: "View the utility module"
          },
          {
            label: "Suggestions",
            value: "Ticket",
            emoji: "<:a_suggestion:1011946163303366657>",
            description: "View the suggestion module"
          },
          {
              label: "Owner",
              value: "owner",
              emoji: "<:a_crown:1012371051499503676>",
              description: "For bot owner only"
              }
        ];*/
        let totalSeconds = (client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      let newm;
      if(minutes == 0){
        newm = `I've been up for **${seconds}s**!`
      } else if(hours == 0){
        newm = `I've been up for **${minutes}m & ${seconds}s**!`
      } else if(days == 0){
        newm = `I've been up for **${hours}h, ${minutes}m & ${seconds}s**!`
      } else {
        newm = `I've been up for **${days}d, ${hours}h, ${minutes}m & ${seconds}s**!`
      }
  /*      let menuSelection = new MessageSelectMenu()
          .setCustomId("MenuSelection")
          .setPlaceholder("🔥⟯-Click me to view Help-Menu-Pages")
          .setMinValues(1)
          .setMaxValues(4)
        .addOptions(menuOptions.filter(Boolean))*/
        let buttonRow = new MessageActionRow().addComponents([button_back,button_home, button_forward, button_tutorial])
       // let SelectionRow = new MessageActionRow().addComponents([menuSelection])
        const allbuttons = [buttonRow]
        //define default embed
        let OverviewEmbed = new MessageEmbed()
        .setColor(`BLUE`).setThumbnail(client.user.displayAvatarURL())
        .setFooter("🔷 On Shard: "+interaction.guild.shardId+"\n"+ client.user.username, client.user.displayAvatarURL())
        .setAuthor(`Information about: ${client.user.username}`, client.user.displayAvatarURL())
        .setDescription(`**${client.user.username} is a Advanced All In One Bot! This includes many image commands, Activities, minigame to entertain you, A Advanced Suggestion System 💡 and A Advanced Ticket System 🎟️**`)

.addField(`<:color_wifi:1011814189456691210> **Statistics:**`, `>>> <:a_slash:1012729191659212830> **${client.slashCommands.size}** Slash Commands\n<:a_member:1012280658585993306> **${client.users.cache.size}** Users\n<:a_category:1012314448372965426> **${client.guilds.cache.size}** Guilds\n<:a_channel:1012313713312800799> **${client.channels.cache.size}** Channels\n<:a_star:1014080767711785030>  I'm on shard **${interaction.guild.shardId}**\n<:a_stats:1012280350854103071> \`${Math.floor(client.ws.ping)}ms\` Ping\n<:a_green:1012314833326178374> **${newm}**`)
.addField(`<:developer:1012624521905319957>  **Development Support:**`, `>>> **<:a_globe:1012625441204482059> Dashboard: [Soon](https://dashboard.asuradev.tk)**\n**<:a_sponser:1012626915561058344> Sponsor: [Creavite](https://crvt.co/b)**\n**<:a_discord:1012625484057686077> Discord: [Asura Hangout](https://discord.gg/JmmdffruHN)**\n**<:a_owner:1012627589594087424> Developer: [Insidious#9123](https://insidious6099.tk)**`)

       
        //Send message with buttons
        let helpmsg = await interaction.followUp({   
            content: `> **${client.user.username} | Use the Components to view the commands**`,
            embeds: [OverviewEmbed], 
            components: allbuttons
        }).catch(e=>{
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          return interaction.followUp(`:x: I couldn't send help? Maybe I am missing the Permission to **EMBED LINKS**`).catch(() => {})
        });
        var edited = false;
        var embeds = [OverviewEmbed]
        for(const e of allotherembeds_eachcategory(true))
          embeds.push(e)        
        let currentPage = 0;

        //create a collector for the thinggy
        const collector = helpmsg.createMessageComponentCollector({
   filter: (i) => (i.isButton() || i.isSelectMenu()) && i.user == interaction.user.id, 
   time: 180e3 
});   
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        collector.on('collect', async b => {
          try{
            if(b.isButton()){
            if(b.user.id !== interaction.user.id)
              return b.reply({content: `❌**Only the one that typed \`/help\` can use this**`, ephemeral: true});
            
              //page forward
              if(b.customId == "1") {
                
                  if (currentPage !== 0) {
                    currentPage -= 1
                  } else {
                      currentPage = embeds.length - 1
                  }
              }
              //go home
              else if(b.customId == "2"){
                
                  currentPage = 0;
              } 
              //go forward
              else if(b.customId == "3"){
                
                  if (currentPage < embeds.length - 1) {
                      currentPage++;
                  } else {
                      currentPage = 0
                  }
              }
              await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons}).catch(e=>{})
              b.deferUpdate().catch(e=>{})
            
              
            }
            if(b.isSelectMenu()){
              
              let index = 0;
              let vembeds = []
              let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
              for(const value of b.values){
                switch (value.toLowerCase()){
                  case "overview": index = 0; break;
                  case "information": index = 1; break;
                  case "minigames": index = 2; break;
                  case "nsfw": index = 3; break;
                  case "suggest": index = 4; break;
                  case "ticket": index = 5; break;
                  case "config": index = 6; break;
                  case "mod": index = 7; break;
                  case "owner": index = 9; break;
                  case "welcome": index = 8; break;
                  case "setup": index = 10; break;
                }
                vembeds.push(theembeds[index])
              }
              b.reply({
                embeds: vembeds,
                ephemeral: true
              });
            }
          }catch (e){
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
            console.log(String(e).italic.italic.grey.dim)
          }
        });
        
        
        
        collector.on('end', collected => {
          let d_buttonRow = new MessageActionRow().addComponents([button_back.setDisabled(true),button_home.setDisabled(true), button_forward.setDisabled(true), button_tutorial])
  //        let d_dropRow = new MessageActionRow().addComponents([menuSelection.setDisabled(true)])
          const alldisabledbuttons = [d_buttonRow]
          if(!edited){
            edited = true;
            helpmsg.edit({ 
              content: `> **${client.user.username} | Time us Up! Use \`/help\` again!**`, 
              components: [alldisabledbuttons]
            }).catch(()=>{})
          }
        })
                
        function allotherembeds_eachcategory(filterdisabled = false){
          //ARRAY OF EMBEDS
          var embeds = [];

          var embed0 = new MessageEmbed()
          .setTitle(`[\`${client.slashCommands.filter((cmd) => cmd.category === "Info").size}\`] <:Z_info:993330382084771962> Information <:Z_info:993330382084771962>`)

          .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "Info").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)
          
          var embed1 = new MessageEmbed()
          .setTitle(`[\`${client.slashCommands.filter((cmd) => cmd.category === "utility").size}\`] <a:thunder:1012371291459825765> Utility Commands <a:thunder:1012371291459825765>`)
          .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "utility").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)
            
          
          var embed2 = new MessageEmbed()
          .setTitle(`[\`${client.slashCommands.filter((cmd) => cmd.category === "🎓 Punishment").size}\`] <:emoji_4:945126945560100884> Moderation Commands <:emoji_4:945126945560100884>`)

          .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "🎓 Punishment").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)

          var embed3 = new MessageEmbed()
          .setTitle(`[\`${client.slashCommands.filter((cmd) => cmd.category === "giveaway").size}\`] <:giveaway:1011945724696596531> Giveaway Commands <:giveaway:1011945724696596531>`)
          .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "giveaway").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)

          var embed4 = new MessageEmbed()
          .setTitle(`[\`${client.slashCommands.filter((cmd) => cmd.category === "Setup").size}\`] <a:B_config:945244082182160456> Setup Commands <a:B_config:945244082182160456>`)
          .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "Setup").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)

          var embed5 = new MessageEmbed()
          .setTitle(`[\`${client.slashCommands.filter((cmd) => cmd.category === "ticket").size}\`]<:a_ticket:1009810761087983696> Ticket Commands <:a_ticket:1009810761087983696>`)
          .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "ticket").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)
          
          var embed6 = new MessageEmbed()
          .setTitle(`[\`${client.slashCommands.filter((cmd) => cmd.category === "🎮 Fun").size}\`] <a:E_Minigame:949181808791146526> Fun Commands <a:E_Minigame:949181808791146526>`)
          .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "🎮 Fun").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)
          var embed8 = new MessageEmbed()
            .setTitle(`[\`${client.slashCommands.filter((cmd) => cmd.category === "owner").size}\`] <:E_developer:991719853650083890> Developer Commands <:E_developer:991719853650083890>`)
            .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "owner").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)
          
          var embed7 = new MessageEmbed()
           .setTitle(`[\`${client.slashCommands.filter((cmd) => cmd.category === "Activity").size}\`]<:a_statistics:1015582709772464148> Activity <:a_statistics:1015582709772464148>`)
           .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "Activity").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)
          var embed9 = new MessageEmbed()
          .setTitle(`<a:config12:945244082182160456> Setup Commands <a:config12:945244082182160456>`)
          .setDescription(`> *${client.slashCommands.filter((cmd) => cmd.category === "Setup").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join(", ")}*`)

          
          
          embeds.push(embed0, embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8)
          
          return embeds.map((embed, index) => {
            return embed
            .setColor(`BLUE`)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(`Page ${index + 1} • ${embeds.length}`, client.user.displayAvatarURL());
          })
        }
    },
};
