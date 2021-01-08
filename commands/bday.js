module.exports = {
    name: "bday",
    description: 'for that special someone',
    execute(message, args) {
        const data = [];

        const banner = "Happy-birthday-jenny!";

        data.push("**SPAM WARNING**");
            //ooo look, you are using the join()
        
        for (const l in banner) {
            data.push(l);
        }

        for (let l in data) {
            // message.channel.send(l)
        }

        for (let i = 0; i < banner.length; i++) {
            message.channel.send(banner.charAt(i));
        }

        // data.push(banner.charAt()).join('\n'));
        // data.push(commands.map(command => command.name).join('\n'));

        // //ooo "split" things? which is fucntion to split the message, just in case it reaches over 2000 chara limit
        // return message.channel.send(data, {split: true});
    },
};