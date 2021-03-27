const ms = require("ms");
const Discord = require('discord.js');

module.exports = {
    name: "alarm",
    description: 'To set second, minute, and hour timers!',
    args: true,
    usage: "<number><s/m/h> <reason>. For example, \"5s test\"",
    guildOnly: true,
    permissions: "MANAGE_NICKNAMES",
    execute(message, args) {
        let time = args[0]
        if (!time) return message.reply("You need to specify the time with a number and the duration. For example, `5s` for 5 seconds!")
        if (ms(time) > ms("1d")) return message.reply("You can't set an alarm longer than 1 day.")

        let reason = args.splice(1).join(' ')
        if (!reason) return message.reply("Reason for alarm")

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} Alarm`, message.author.displayAvatarURL())
            .setColor("00ffcc")
            .setDescription(`Time: \`${time}\`\nReason: \`${reason}\``)
            .setTimestamp()
        message.channel.send(embed)

        setTimeout(() => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} Your alarm has ended.`, message.author.displayAvatarURL())
                .setColor("00ffcc")
                .setDescription(`Time: \`${time}\`\nReason: \`${reason}\`\nAlarm set in server: \`${message.guild.name}\``)
                .setTimestamp()
            message.channel.send(embed),
            message.author.send(embed)
        }, ms(time))
    },
};
