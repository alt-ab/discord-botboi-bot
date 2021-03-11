module.exports = {
    name: "bday",
    description: 'for that special someone',
    usage: "Tell the world it's somebody's birthday!",
    execute(message, args) {
        const data = [];

        let member = message.mentions.members.first();

        const banner = "Happy birthday!";

        for (let i = 0; i < banner.length; i++) {

            data.push(banner.charAt(i));
        }

        if (!args.length) {
            message.channel.send(data.join('\n') + `${message.author}`);
        } else {
            message.channel.send(data.join('\n') + `\n ` + member.displayName);
        }

        message.channel.send('`Congrats! you have unlocked a secret!` I can also sing Happy Bithday with `bbsing`');
    },
};