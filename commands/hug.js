var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

module.exports = {
    name: "hug",
    description: 'Hug your enemies',
    args: true,
    usage: '<user>',
    execute(message, args) {

        let member = args[0];

        giphy.search('gifs',{"q": "hug"})
             .then((response) => {
                 var totalResponses = response.data.length;
                 var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                 var responseFinal = response.data[responseIndex];
                 //* code^^ for randomizing
                 message.channel.send("❤ " + member + ` You have been hugged by ${message.author}`, {
                     files: [responseFinal.images.fixed_height.url]
                 })
             })
    },
};