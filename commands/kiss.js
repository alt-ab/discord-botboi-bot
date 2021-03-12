var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

module.exports = {
    name: "smack",
    description: 'Kiss your enemies',
    args: true,
    usage: '<user>',
    execute(message, args) {

        let member = args[0];

        giphy.search('gifs',{"q": "anime kiss"})
             .then((response) => {
                 var totalResponses = response.data.length;
                 var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                 var responseFinal = response.data[responseIndex];
                 //* code^^ for randomizing
                 message.channel.send(":wave: " + member + ` You have been smacked by ${message.author}`, {
                     files: [responseFinal.images.fixed_height.url]
                 })
             })
    },
};