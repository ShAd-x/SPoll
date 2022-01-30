const { MessageEmbed } = require('discord.js')
const version = require('../config.json').version

module.exports = {
    run: async (client, message) => {
        let args = message.content.substring(client.config.prefix.length).split(" ")
        if(!args[1]){
            const embed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle("❌ Erreur - le sondage n'a pas été renseigné")
                .setDescription("» s:simplepoll <sondage> pour créer un sondage")
                .setFooter({ text: `${client.user.username} (V${version})`, iconURL: `${client.user.displayAvatarURL()}` })
                .setTimestamp()
            message.reply({ embeds: [embed]})
        } else {
            let msgArgs = args.slice(1).join(" ")
            const author = message.member.user
            const pollEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setAuthor({ name: `Proposé par ${author.tag} 📌`, iconURL: `${author.displayAvatarURL()}` })
                .setTitle("Nouveau sondage :")
                .setDescription("** » "+msgArgs+"**")
                .setFooter({ text: `${client.user.username} (V${version})`, iconURL: `${client.user.displayAvatarURL()}` })
                .setTimestamp()
            message.channel.send({ embeds: [pollEmbed]}).then(messageReaction => {
                messageReaction.react("✅")
                messageReaction.react("🤷")
                messageReaction.react("❌")
            })
        }
        message.delete(3000).catch(console.error)
    },
    name: 'simplepoll',
    aliases: ['simplesondage','sp'],
    description: 'Commande de sondage simple'
}