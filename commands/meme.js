var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

module.exports = {
    name: "meme",
    description: 'I\'ll send a funny meme!',
    usage: '<search word>',
    arg: true,
    cooldown: 2,
    execute(message, args) {
        giphy.search('gifs', {"q":args})
        .then((response) => {
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];
            
            message.channel.send({
                files: [responseFinal.images.fixed_height.url]
            })
            .catch(() => {
                message.reply("There was an error!")
            });
        });
    },
};