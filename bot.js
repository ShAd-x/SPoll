const { Client, Collection } = require('discord.js')
const path = require('path')
const { readdir, statSync } = require('fs')
const config = require('./config.json')

module.exports = class bot extends Client {
    constructor(){
        super({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'] })
        this.commands = new Collection()
        this.aliases = new Collection()
        this.config = config
        void this.start()
    }
    start() {
        void this.loadEvents()
        void this.loadCommands()
        void this.login(this.config.token)
    }
    async loadEvents(filePath = path.join(__dirname, './events')) {
        readdir(filePath, (err, files) => {
            if(err) return console.error(err)
            if(!files) return console.error('No events directory found')
            for(let i = 0; i < files.length; i++) {
                if(statSync(path.join(filePath, files[i])).isDirectory()) {
                    this.loadEvents(path.join(filePath, files[i]), files[i])
                } else {
                    const event = require(path.join(filePath, files[i]))
                    this.on(event.name, (...args) => event.run(this, ...args))
                }
            }
        })
    }
    async loadCommands(filePath = path.join(__dirname, './commands')) {
        readdir(filePath, (err, files) => {
            if(err) return console.error(err)
            if(!files) return console.error('No commands directory found')
            for(let i = 0; i < files.length; i++) {
                if(statSync(path.join(filePath, files[i])).isDirectory()) {
                    this.loadCommands(path.join(filePath, files[i]), files[i])
                } else {
                    const command = require(path.join(filePath, files[i]))
                    this.commands.set(command.name, command)
                    for(let h = 0; h < command.aliases.length; h++) {
                        this.aliases.set(command.aliases[h], command.name)
                    }
                }
            }
        })
    }
}