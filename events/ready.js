const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const client = require("../index");

client.on("ready", () => {
    console.log(cyan.bold(``+blue.bold(`[⚡ ] :`)+`: Powered by: Asura Hangout`));
    console.log(green.bold(``+blue.bold(`[🤖 ] :`)+`: Logged in as: ` + magenta(`${client.user.tag}`)));
    console.log(green.bold(``+blue.bold(`[🔗 ] :`)+`: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`))
    client.user.setActivity(client.config.activity, {type: client.config.type});
    client.user.setStatus(client.config.status)
});
