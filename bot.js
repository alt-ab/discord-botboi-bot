require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Blast off! Logged in as ${client.user.tag}!`);
});

const PORT = process.env.PORT || 3000;

client.on(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(process.env.DISCORD_TOKEN);

// -p $PORT for Procfile
