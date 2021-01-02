const prefix = process.env.prefix;

module.exports = {
    name: "help",
    description: 'You called? \n List commands and specific info!',
    aliases: ["commands"],
    usage: '[command name]',
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            //using the .push function! to append the data array with what you need
            data.push("**List of all my commands:**");
            //ooo look, you are using the join()
            data.push(commands.map(command => command.name).join('\n'));
            data.push(`\nType \`${prefix}help [command name]\` to get more info on that command :thumbsup:!`);

            //ooo "split" things? which is fucntion to split the message, just in case it reaches over 2000 chara limit
            return message.channel.send(data, {split: true});
            // .then(() => {
            //     if (message.channel.type === "dm") return;
            //     message.reply('I just sent you a DM with all my info :S');
            // })
            // .catch(error => {
            //     console.error(`Could not send DM to ${message.author.tag}.\n`, error);
            //     message.reply("I can't DM you... is your DMs dsiabled?");
            // })
        }

        //if they DID input a specific command...
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("That\'s not a valid command");
        }

        data.push(`**Name: **${command.name}`);

        if (command.aliases) data.push(`**Aliases: **${command.aliases.join(',')}`);
        if (command.description) data.push(`**Description: **${command.description}`);
        if (command.usage) data.push(`**Usage: **${prefix}${command.name}${command.usage}`);

        data.push(`**Cooldown: **${command.cooldown || 3} second(s)`);

        message.channel.send(data, {split: true });

    },
};