const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Displays the userinfo of the specified target.",
    category: "Info",
    options: [
        {
            name: "target",
            description: "Select the target.",
            type: "USER",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction, args) => {
        const target = interaction.options.getMember("target") || interaction.member;
        await target.user.fetch();

        const getPresence = (status) => {
            const statusType = {
                idle: "https://cdn.discordapp.com/attachments/935594671953027186/968316366694268958/qfsgdr.png",
                dnd: "https://cdn.discordapp.com/attachments/935594671953027186/968316441147355137/fzzf.png",
                online: "https://cdn.discordapp.com/attachments/935594671953027186/968316366908166247/vnggf.png",
                invisible: "https://cdn.discordapp.com/attachments/935594671953027186/968316440891519036/sggrrt.png"
            };

            return `https://i.imgur.com/${statusType[status] || statusType["invisible"]}`;
        };
        
			
        const response = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor({ name: target.user.tag })
            .setThumbnail(target.user.avatarURL({ dynamic: true }))
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .addFields(
                { name: "<:icons_join_qsd:968321892211625984> Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "<:emoji9_qds:968321442284437578> Account Created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "<:icons_colorstaff_qfs:968322439069188116> Roles", value: target.roles.cache.map(r => r).sort((a, b) => b.position - a.position).join(" ").replace("@everyone", "") || "None" },
                { name: "Nickname", value: target.nickname || "None", inline: true },
                { name: "Accent Colour", value: target.user.accentColor ? `#${target.user.accentColor.toString(16)}` : "None", inline: true },
                { name: "Banner", value: target.user.bannerURL() ? "** **" : "None" }
            );

        interaction.followUp({ embeds: [response], ephemeral: false });
    }
}