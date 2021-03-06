var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

module.exports = {
    name: "kill",
    description: 'Love your friends to death',
    args: true,
    usage: '<user>',
    execute(message, args) {

        let member = args[0];

        giphy.search('gifs',{"q": "murder cartoon"})
             .then((response) => {
                 var totalResponses = response.data.length;
                 var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                 var responseFinal = response.data[responseIndex];
                 //* code^^ for randomizing
                 message.channel.send("🗡 " + member + ` has been killed by ${message.author}`, {
                     files: [responseFinal.images.fixed_height.url]
                 })
             })
    },
};