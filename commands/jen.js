var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

module.exports = {
    name: "jen",
    description: 'for jen',
    execute(message, args) {
        const jenHappiness = ["wonpil day6", "txt", "bts", "jackson wang", "suga", "rm", "jimin","taehyun","jungkook","day6"]
        var jenRandom = Math.floor(Math.random() * jenHappiness.length);
        console.log(jenHappiness[jenRandom]);

        jenVari = jenHappiness[jenRandom];

        giphy.search('gifs', {"q":jenVari})
        .then((response) => {
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];

            console.log("A meme was asked");
            
            message.channel.send({
                files: [responseFinal.images.fixed_height.url]
            })
            message.channel.send("if it wasn't obvious... i'm sorry")
            .catch(() => {
                message.reply("There was an error!")
            });
        });
    },
};