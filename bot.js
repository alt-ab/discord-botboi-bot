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

///


//   if (message.member.hasPermission('KICK_MEMBERS')) {
      
//       if(message.content.startsWith(`${prefix}kick`)) {
//         let member = message.mentions.members.first();
//           if (!args.size) {
//               return message.reply("You need to @ somebody!")
//           }

//           member.kick().then((member) => {

//               giphy.search('gifs',{"q": "fail"})
//                   .then((response) => {
//                       var totalResponses = response.data.length;
//                       var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
//                       var responseFinal = response.data[responseIndex];
//                       //* code^^ for randomizing
//                       message.channel.send(":wave: " + member.displayName + " is a dropout!!", {
//                           files: [responseFinal.images.fixed_height.url]
//                       })
//                   })
//           });
          
      
//       }
          
//   }

//   if (message.content.includes(`${prefix}dm me`)) {
//     message.author.send(`Yessir!`);
//   }

//   if (message.content.includes(`${prefix}help`)) {
//       let help = new Discord.MessageEmbed();
//       help.setAuthor(client.user.username, client.user.displayAvatarURL());
//       help.setAuthor = (client.user.username, client.user.displayAvatarURL());
//       help.setTitle("Help!");
//       help.setDescription("DM me! Not the bot me, but the coder @b_ambi#0749");
//       help.setColor('00ffcc');

//       message.channel.send(help);
//   }

//   if (message.content.startsWith(`${prefix}commands`)) {
//       const embed = new Discord.MessageEmbed();

//       embed.setAuthor(client.user.username, client.user.displayAvatarURL());
//       embed.setTitle("Commands");
//       embed.setColor('00ffcc');
//       embed.addField("Botboi Commands w/ ``bb <command>``", "commands: **help, commands, invite**, ping, echo, kick, dm me, link");
//       embed.addField("Meme Commands w/ ``bbmeme <command>``", "commands: meme");
//       embed.addField("Streaming/Coding Schedules", "More hours to come! use ``bbhelp`` & DM if you want to display your stream times");
//       embed.addField("Riddle Commands w/ ``bb? <command>``", "commands: riddles, & **coming soon** hint1");

//       message.channel.send(embed);
//   }

//   if (message.content.startsWith(`${prefix}suggest`)) {
//       console.log(message.content.substring(10));
//   }

//   if (message.content.startsWith(`${prefix}invite`)) {
//       message.channel.send("https://discord.com/api/oauth2/authorize?client_id=702301294802501782&permissions=2147483639&scope=bot")
//   }

  //, {
  //    files: [C:\Users\ab420\Desktop\python and code\discord-botboi-bot\R2-D2-512.png]
  //}
//   if (message.content.startsWith(`${prefix}ping`) || message.content.includes('Ping')) {
//       message.channel.send(":ping_pong: pong!")
//   }

//   if (message.content.includes(`${prefix}link`)) {
//       var amie = "Kawaii To Do list ";
//       var result = "https://amie.so/w/?ref=LDSEWM6YX ";
//       message.channel.send(":D " + amie + result);
//   }

//   if (message.content.startsWith(`${memefix} `)) {
//       if (message.content.length)
//       //If message content DOES NOT equal nothing then 

//         giphy.search('gifs', {"q":message.content})
//         .then((response) => {
//             var totalResponses = response.data.length;
//             var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
//             var responseFinal = response.data[responseIndex];

//             message.channel.send({
//                 files: [responseFinal.images.fixed_height.url]
//             })
//         }).catch(() => {
//             message.channel.send('Error sorry');
//         })
//   }

//   if (message.content.includes(`${prefix}echo`)) {
//       message.channel.send(message.content.replace('botboi echo', ':microphone:'))
//   }

//   //! add '=>' in between the ) and the { ?
//   if (message.content.startsWith(`${memefix}kpop`) || message.content.includes('bb jen')) {

//     giphy.search('gifs', {"q":"kpop"})
//     .then((response) => {
//         var totalResponses = response.data.length;
//         var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
//         var responseFinal = response.data[responseIndex];

//         message.channel.send({
//             files: [responseFinal.image.fixed_height.url]
//         })
//     }).catch(() => {
//         message.channel.send('One sec');
//     })
//  }
//Riddle me this!
  //if (msg.content === `"Your message!"`) {
  //  msg.channel.type === (`"dm"`) + msg.author.sendMessage(`"Your other message"`);
  //}
 
//   if (message.content.includes (`${riddlefix}hi im dad`) || message.content.includes ("? ur mom")) {
//         message.author.send(`Congrats, on to the next the riddle!` + ` | Walk but can't run, x and y direction have WHAT THING in common? |` ).catch (() => {
//             message.console.send(`Error`);
//         })
//   }

});

client.login(process.env.DISCORD_TOKEN);


// -p $PORT for Procfile
// and because I'm lazy 
// Git add .; Git commit -m "commit message"

//*if(message.member.roles.has(role.id)) {
    // user has that role
  //} else {
    //user doesn't have that role
  //}

  //if (command === "commandname"){
   // let allowedRole = message.guild.roles.find("name", "rolename");
   // if (message.member.roles.has(allowedRole.id) {
        // allowed access to command
   // } else {
       // not allowed access
   // // }
