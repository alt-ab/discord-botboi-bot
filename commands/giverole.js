module.exports = {
    name: "giverole",
    description: 'Give a role to a fellow member!',
    permissions: "MANAGE_NICKNAMES",
    args: true,
    guildOnly: true,
    usage: "<@user> <role name>",
    execute(message, args) {
        const user = message.mentions.users.first()
        
        if (!user) {
            message.reply('Specify the user')
            return
        }

        const roleName = args.shift().join('')

    },
};