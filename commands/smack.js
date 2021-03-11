var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

module.exports = {
    name: "smack",
    description: 'Smack your enemies',
    args: true,
    usage: '<user>',
    execute(message, args) {
        // if (!message.mentions.users.size) {
        //     return message.channel.send("You need to call out people!")
        // }
  
        // const callOutList = message.mentions.users.map(
        //     user => {
        //         return `${user.tag}`;
        //     });

        // message.channel.send(callOutList);

        let member = message.mentions.members.first();

        giphy.search('gifs',{"q": "hit"})
             .then((response) => {
                 var totalResponses = response.data.length;
                 var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                 var responseFinal = response.data[responseIndex];
                 //* code^^ for randomizing
                 message.channel.send(":wave: " + member.displayName + `You have been smacked by ${message.author}`, {
                     files: [responseFinal.images.fixed_height.url]
                 })
             })
    },
};