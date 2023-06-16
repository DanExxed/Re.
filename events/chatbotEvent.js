const client = require("../index");
const { MessageEmbed, Collection } = require("discord.js")
const fetch = require("node-fetch")

const apiKey = 'R3UL1QUMbw9aTCnM';
const botId = '171405';

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const input = encodeURIComponent(message.content);
const response = await fetch(`http://api.brainshop.ai/get?bid=171405&key=R3UL1QUMbw9aTCnM&uid=1&msg${input}`);
  const json = await response.json();
  message.channel.send(json.cnt);
});