require('dotenv').config();

//Discord
const fs = require("fs");
const Discord = require('discord.js');

const cooldowns = new Discord.Collection();

const client = new Discord.Client();
client.commands = new Discord.Collection();


//set a new item in the Collection and it will be exported to here
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Configuration 
//other set up, don't forget to set up in Heroku too
const PORT = process.env.PORT || 3000;
const prefix = process.env.prefix;
const memefix = process.env.memefix;
const riddlefix = process.env.riddlefix;

client.on(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});

//Giphy
var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);


//Blast off!
client.once('ready', () => {
  console.log(`Blast off!`);
});
//* Logged in as ${client.user.tag}

client.once('reconnecting', () => {
    console.log(`Reconnecting!`);
});

client.once('disconnect', () => {
    console.log(`Disconnected!`);
});

//how to break string/text line -> \n

client.on('message', message => {

    if (message.content.startsWith("botboi") || message.content.startsWith("Botboi")) {
        let explain = new Discord.MessageEmbed();
        
        explain.setTitle("BotBoi :robot:");
        explain.setColor('00ffcc');
        explain.setAuthor(client.user.username, client.user.displayAvatarURL());
        //explain.setTimestamp();
        explain.setDescription(":robot:" + "**I do many fun things** Always open to suggestions ``bbsuggest``" + 
                               " State = in construction... ~~ask my mom~~");
        explain.addField("Prefix", "My perfix is ``bb``");
        explain.addField("Help", "try ``bbhelp`` or ``bbcommands``!");
        explain.setThumbnail(client.user.displayAvatarURL());
        explain.setAuthor(client.user.username, client.user.displayAvatarURL());
  
        message.channel.send(explain);
    }

    //for secret sing command
    if (message.content.startsWith('bbsing')) {

      const banner = "Happy-birthday!";

      message.channel.send("**SPAM WARNING**");
          //ooo look, you are using the join()
      

      for (let i = 0; i < banner.length; i++) {
          message.channel.send(banner.charAt(i));
      }
    }

///
//tutorial discordjs.guide/creating-your-bot/... 

  //check for not prefix or bots
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  //args.shift will remove from array which is 'args' while also returning the first element (the command) 
  //and then you add the toLowerCase function on top of that
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
  || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  //catching empty arguments for only the required commands with &&
  //notice the 'return'
  if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}`;

      //make it even more dynamic by telling the user you need an argument for that specific command w/ "if usage in command file is a thing/is true..."
     //notice the back slashes
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

      return message.channel.send(reply);
  }
  
  //again more dynamic with this "branch?" with server-only commands
  if (command.guildOnly && !message.channel.type === "dm") {
     return message.reply("I can\'t execute that command inside your DMs!");
  }

  //how to check for permissions
  if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.client.user);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
          return message.channel.reply("You don't have the permissions boy");
      }
  }

  //DEALING WITH TIME w/ discord Collections and a lil math
  if (!cooldowns.has(command.name)) {
	 cooldowns.set(command.name, new Discord.Collection());
  }
  //checking if there was already a cooldown set, and if not add one
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    //remember the Collections pair the User's ID and their cooldown time
	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


  //you made your bot dynamically load and execute your commands here
  try {
      //was 'client.commands.get(command).execute(message, args);' but was able to refactor
      command.execute(message, args);
  } catch (error) {
	console.error(error);
	message.reply('There was an error trying to execute that command!');
  }

});

client.login(process.env.DISCORD_TOKEN);

