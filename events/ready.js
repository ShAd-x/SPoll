module.exports = {
    run: async(client) => {
        try {
            client.user.setPresence({
                activities: [{
                    type: 'WATCHING',
                    name: new Array(...client.guilds.cache).length + ' serveurs' + ' 👀'
                }]
            })
        } catch (err) { if(err) console.error(err) }
        return console.log(`• ${client.user.tag} (V${client.config.version}) vient d'être démarré.`);
    },
    name: 'ready'
}