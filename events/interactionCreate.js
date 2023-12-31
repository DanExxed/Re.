const client = require("../index");
const { MessageEmbed, Collection } = require("discord.js")
const cooldowns = new Map();
//const model_active = require("../models/active")

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) return interaction.followUp({ content: "An error has occured " });

   //   let model_active2 = await model_active.findOne({ Guild: interaction.guild.id })
   //   if(!model_active2 && cmd.premium == true) return interaction.reply({ content: `⭐ This server isn't a premium server therefore you cannot use any commands!\n\n> ***[Buy a premium license here](https://discord.avedevelopment.tk)***`, ephemeral: true })
//===========Help Page===========//
     /*   if (interaction.values == "asura_help") {

if(!interaction.member.permissions.has("SEND_MESSAGES")) return 

interaction.reply({ embeds:[
        new MessageEmbed()
    .setTitle(`What are the requirements for a joining our Team?`)
.setDescription(`**General Requirements**\n>>> - Beeing able to read, speak and write english\n- Atleast one hour activity daily in Tickets\n- Ability to stay calm even in stress situations.\n- Ability to stay patience even at long waiting times\n- Ability to listen and follow Instructions and Team Rules\n- Ability write formal Messages and using formal language\n- Ability to understand their own mistakes, apologies them and not reproduce them`)
    .setColor("BLUE")], ephemeral: true })
       }*/
 //========Help page end========//
      if (!cooldowns.has(cmd.name)) {
        const coll = new Collection();
        cooldowns.set(cmd.name, coll);
      }
      const current_time = Date.now();
      const time_stamps = cooldowns.get(cmd.name);
      const cooldown_amount = cmd.cooldown * 1000;
      if (time_stamps.has(interaction.user.id)) {
        const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amount;
        if (current_time < expiration_time) {
          const time_left = (expiration_time - current_time) / 1000;
          const embed = new MessageEmbed().setColor("RED").setTitle(`${client.emoji.wrong} Too Fast!`).setDescription(`**You are in a cooldown! Please wait \`${time_left.toFixed(1)}\` seconds, To Use the command, \`${cmd.name}\` Again**!`).setFooter(`Powered by ave development`)
          return interaction.reply({ embeds: [embed] });
        }
      }
      time_stamps.set(interaction.user.id, current_time);
      setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);

      await interaction.deferReply({ ephemeral: false }).catch(() => {});
      const args = [];

      for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(interaction.user.id);
      cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
