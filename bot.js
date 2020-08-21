require('dotenv').config();

//Discord
const Discord = require('discord.js');
const client = new Discord.Client();

//Giphy
var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

//set up
const PORT = process.env.PORT || 3000;

client.on(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});

//output & code
client.on('ready', () => {
  console.log(`Blast off! Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});


//bottom
client.login(process.env.DISCORD_TOKEN);
// -p $PORT for Procfile
