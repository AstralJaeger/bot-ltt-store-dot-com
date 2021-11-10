const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { Client, Intents, Collection} = require('discord.js')
const config = require('./config.json')

const client = new Client({intents: [Intents.FLAGS.GUILDS]})

//region register commands to client
client.commands = new Collection()

for (const file of fs.readdirSync('./commands').filter(file => file.endsWith('.js'))) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}
//endregion


client.once('ready', () => {
    console.log('Ready.')
});

client.login(config.token)
