module.exports = {
    name: "quote",
    description: 'To quote memorable moments',
    args: true,
    usage: "<@person> quote. Permissions required",
    guildOnly: true,
    permissions: "MANAGE_NICKNAMES",
    execute(message, args) {
        if (args.length > 1) {    
            let member = args[0]; 
            content = args.splice(1).join(' ');
        
            message.channel.send(member + " said: " + content);

            message.channel.bulkDelete(1, true);

            message.react('✅');
        } else {
            message.channel.send('You need to quote somebody!')
            console.log(args)
        }
    },
};
