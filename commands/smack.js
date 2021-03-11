var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

module.exports = {
    name: "smack",
    args: true,
    usage: '<user>',
    description: 'Smack your enemies',
    execute(message, args) {
        let member = message.mentions.members.first();

        if (!args.size) {
            return message.reply("You need to @ somebody!")
        }

        giphy.search('gifs',{"q": "hit"})
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                //* code^^ for randomizing
                message.channel.send(`:wave: ${member.displayName} You have been smacked by ${message.author}`, {
                    files: [responseFinal.images.fixed_height.url]
                })
            })
    },
};