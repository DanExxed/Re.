const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Gets the invite link of bot",
    type: 'CHAT_INPUT',
    category: "Info",
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);

      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`Invite ${client.user.username}`)
      .setDescription(`Once you invite me run **/help** to get started managing server the right way for your guild!`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
      .setFooter(`Coded By Insidious`) 

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
				.setLabel('Invite')
				.setStyle('LINK'),
			);
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb], components: [row] });
      }, 500);
    },
};
