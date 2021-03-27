var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);
const Discord = require('discord.js');

module.exports = {
    name: "kick",
    args: true,
    usage: '<user>',
    guildOnly: true,
    permissions: "KICK_MEMBERS",
    cooldown: 5,
    description: 'Make a user extinct',
    execute(message, args) {
        const member = message.mentions.members.first();
        
        if (!args.size) {
            return message.reply("You need to @ somebody!")
        }
        console.log(args[0])

        member.kick()
        .then((member) => {

            giphy.search('gifs',{"q": "fail"})
                .then((response) => {
                    var totalResponses = response.data.length;
                    var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                    var responseFinal = response.data[responseIndex];
                    //* code^^ for randomizing & there is a reason for putting member.displayName outside of backticks
                    message.channel.send(":wave: " + member.displayName + " is a dropout!!", {
                        files: [responseFinal.images.fixed_height.url]
                    })
                })
        });
    },
};