const setupFiles = require('./setupFiles')
setupFiles.createAll()

const Discord = require("discord.js")
const Client = require('./client')
const fs = require('fs')

require('dotenv').config()

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync("./commands")
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("Ready!");
    client.user.setPresence({ game: { name: process.env.BOT_STATUS, type: 1 } });
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

client.on("message", async message => {
    const commandName = message.content
        .replace(process.env.PREFIX, "")
        .trim()
        .split(" ")[0];
    const command = client.commands.get(commandName);

    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    try {
        command.execute(message);
    } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }
});

client.login(process.env.DISCORD_KEY);