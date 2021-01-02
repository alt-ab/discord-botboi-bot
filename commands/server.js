module.exports = {
    name: "server",
    description: 'Tells you what server you are on!',
    execute(message, args) {
        message.channel.send(`You are on ${message.guild.name} with ${message.guild.memberCount}s of your friends!`);
          //WHAT ARE GUILDS? SERVERS!
    },
};