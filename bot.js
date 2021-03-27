require('dotenv').config();

//Discord
const fs = require("fs");
const Discord = require('discord.js');
const ms = require("ms");

const quiz = require('./commands/quiz.json');

const cooldowns = new Discord.Collection();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Configuration 
const PORT = process.env.PORT || 3000;
const prefix = process.env.prefix;

client.on(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});

//Giphy
var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

client.once('ready', () => {
  console.log(`Blast off!`);
  client.user.setActivity("for \"botboi\"", { type: "WATCHING" });
});
//* Logged in as ${client.user.tag}

client.once('reconnecting', () => {
    console.log(`Reconnecting!`);
});

client.once('disconnect', () => {
    console.log(`Disconnected!`);
});

client.on('message', message => {

    if (message.content.startsWith("botboi") || message.content.startsWith("Botboi")) {
        let explain = new Discord.MessageEmbed();
        
        explain.setTitle("BotBoi :robot:")
        .setColor('00ffcc')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(":robot:" + "**I do many fun and random things** I was created by @alxndria#0749. If you have any questions, ask her!")
        .addField("Prefix", `My perfix is ${prefix}!`)
        .addField("Commands", `For commands, ${prefix}help or ${prefix}commands!`)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor(client.user.username, client.user.displayAvatarURL());
  
        message.channel.send(explain);
    }

    //for secret sing command
    if (message.content.startsWith('bbsing')) {

      const banner = "Happy-birthday!";

      message.channel.send("**SPAM WARNING**");

      for (let i = 0; i < banner.length; i++) {
          message.channel.send(banner.charAt(i));
      }
    }


  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
  || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  
  if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

      return message.channel.send(reply);
  }
  
  if (command.guildOnly && !message.channel.type === "dm") {
     return message.reply("I can\'t execute that command inside your DMs!");
  }

  if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You do not have permissions boy');
		}
	}

  if (!cooldowns.has(command.name)) {
	 cooldowns.set(command.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


  try {
      command.execute(message, args);
  } catch (error) {
	console.error(error);
	message.reply('There was an error trying to execute that command!');
  }

});

client.login(process.env.DISCORD_TOKEN);

