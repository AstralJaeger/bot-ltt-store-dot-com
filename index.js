const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { Client, Intents, Collection} = require('discord.js')
const config = require('./config.json')

const client = new Client({intents: [Intents.FLAGS.GUILDS]})

//region update slashcommands and register commands to client
const commands = []
client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
    client.commands.set(command.data.name, command)
}

const rest = new REST({version : '9'}).setToken(config.token)
rest.put(Routes.applicationCommands(config.clientId))
//endregion


client.once('ready', () => {
    console.log('ready')
});

client.login(config.token)
