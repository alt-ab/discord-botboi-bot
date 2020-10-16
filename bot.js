require('dotenv').config();

//Discord
const Discord = require('discord.js');
const client = new Discord.Client();

//Giphy
var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

//other set up, don't forget to set up in Heroku too
const PORT = process.env.PORT || 3000;
const prefix = process.env.prefix;
const memefix = process.env.memefix;
const riddlefix = process.env.riddlefix;

client.on(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});

//output & code
client.on('ready', () => {
  console.log(`Blast off! Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.member.hasPermission('KICK_MEMBERS')) {
     // console.log('This member can kick');
      
      if(message.content.startsWith(`${prefix}kick`)) {
          //message.channel.send("Kick")

          let member = message.mentions.members.first();
          member.kick().then((member) => {

              giphy.search('gifs',{"q": "fail"})
                  .then((response) => {
                      var totalResponses = response.data.length;
                      var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                      var responseFinal = response.data[responseIndex];
                      //* code^^ for randomizing
                      message.channel.send(":wave: " + member.displayName + " is a dropout!!", {
                          files: [responseFinal.images.fixed_height.url]
                      })
                  }).catch(() => {
                      message.channel.send('Error sorry');
                  })

  
          })
      
      }
          
  }

//commands for general people 

  if (message.content.startsWith("botboi")) {
      var explain = "My perfix is `~bb`` ask for *help* or *commands*!";
      message.channel.send("Hello! :robot:" + explain);
  }
  if (message.content.includes (`${prefix}dm me`)) {
    message.author.send(`Yessir!`);
  }

  if (message.content.startsWith(`${prefix}help`)) {
      message.channel.send(":robot:" + "**I do many fun things** Always open to suggestions ``bbsuggestions``" + "State = in construction... ~~ask my mom~~");
  }

  if (message.content.startsWith(`${prefix}commands`)) {
      const embed = new Discord.RichEmbed();

      embed.setAuthor(client.user.username, client.user.defaultAvatarURL);
      embed.addField("Botboi Commands w/ ```bb``` prefix", "ping, echo, kick, dm, **link**, *help*");
      embed.addField("Meme Commands", "bbmeme <meme>");
      embed.addField("Streaming/Coding", "More hours to come! DM my mom if you want to display your stream times");
      embed.addField("Riddle Commands w/ ```bb?```", "riddles **coming soon** hint1");

      message.channel.send((embed));
  }

  if (message.content.toLocaleLowerCase() === `${prefix}suggestions`) {
      var suggestions = message.content.split(' ').slice(2).join(' ');
      console.log(suggestions);
  }

  //, {
  //    files: [C:\Users\ab420\Desktop\python and code\discord-botboi-bot\R2-D2-512.png]
  //}
  if (message.content.startsWith(`${prefix}ping`) || message.content.includes('Ping')) {
      message.channel.send(":ping_pong: pong!")
  }

  if (message.content.includes(`${prefix}link`)) {
      var amie = "Kawaii To Do list";
      var result = amie.link("https://amie.so/w/?ref=LDSEWM6YX");
      message.channel.send(":D" + result);
  }

  if (message.content.startsWith(`${memefix}`)) {

      giphy.search('gifs', {"q":message.content})
      .then((response) => {
          var totalResponses = response.data.length;
          var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
          var responseFinal = response.data[responseIndex];

          message.channel.send({
              files: [responseFinal.images.fixed_height.url]
          })
      }).catch(() => {
          message.channel.send('Error sorry');
      })
  }

  if (message.content.includes(`${prefix}echo`)) {
      message.channel.send(message.content.replace('botboi echo', ':microphone:'))
  }

  if (message.content.startsWith(`${memefix}kpop`) || message.content.includes('botboi jen')) {

    giphy.search('gifs', {"q":"kpop"})
    .then((response) => {
        var totalResponses = response.data.length;
        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
        var responseFinal = response.data[responseIndex];

        message.channel.send({
            files: [responseFinal.image.fixed_height.url]
        })
    }).catch(() => {
        message.channel.send('One sec');
    })
 }
//Riddle me this!
  //if (msg.content === `"Your message!"`) {
  //  msg.channel.type === (`"dm"`) + msg.author.sendMessage(`"Your other message"`);
  //}
 
  if (message.content.includes (`${riddlefix}hi im dad`) || message.content.includes ("? ur mom")) {
        message.author.send(`Congrats, on to the next the riddle!` + ` | Walk but can't run, x and y direction have WHAT THING in common? |` ).catch (() => {
            message.console.send(`Error`);
        })
  }

});


//bottom
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
   // }
