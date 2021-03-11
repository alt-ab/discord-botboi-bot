module.exports = {
    name: "quote",
    description: 'To quote memorable moments',
    args: true,
    usage: "<@person> <quote>",
    execute(message, args) {
        if (args.length > 2) {
            let member = args[1]; 
            args2 = msgArray.slice(2);
            args2= args2.join(' '); 
        
            message.channel.send(member.displayName + " said: " + args2);
        } else {
            message.channel.send("You need to @ the person and say the quote!")
        }
    },
};
