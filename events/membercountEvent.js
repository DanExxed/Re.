const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const client = require("../index");
const model = require("../models/membercountsystem");
const Discord = require(`discord.js`);

setInterval(async() => {
const schema = await model.find();
  schema.forEach(async(data) => {
    const guild = await client.guilds.cache.get(data.Guild);
    if(!guild) return;

    const channel = await guild.channels.cache.get(data.Channel);
    if(!channel) return;

    let type = data.Type;

    if(type == "members") {
      channel.setName(`Total Members: ${guild.memberCount}`)
    } else if(type == "users") {
      channel.setName(`Total Users: ${guild.members.cache.filter(member => !member.user.bot).size}`)
    } else if(type == "bots") {
      channel.setName(`Total Bots: ${guild.members.cache.filter(member => member.user.bot).size}`)
    }
    
  })

}, 120000) // 2 mins