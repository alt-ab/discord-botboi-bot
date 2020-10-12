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

  if (message.content.startsWith(`${prefix}h`)) {
      message.channel.send("yes?")
  }
  if (message.content.includes (`dm me`)) {
    message.author.send(`Yessir!`);
  }

  if (message.content.startsWith(`${prefix}help`)) {
      message.channel.send(":robot:  **I do many fun things but I only one bot** ask me 'why' or 'commands'. State = in construction... ~~idk ask my mom~~")
  }
  if (message.content.startsWith(`${prefix}commands`)) {
      message.channel.send("I do 'ping', 'echo', 'botboimeme', 'kick' (for admins only of course)." + " Just use my prefix 'botboi' for all of them except the memes, instead say 'botboimeme'  :robot:")
  }
  if (message.content.startsWith(`${prefix}why`)) {
      message.channel.send("***why we exist? Because #yolo that's why***")
  }
  //, {
  //    files: [C:\Users\ab420\Desktop\python and code\discord-botboi-bot\R2-D2-512.png]
  //}
  if (message.content.startsWith(`${prefix}ping`) || message.content.includes('Ping')) {
      message.channel.send(":ping_pong: pong!")
  }

  if (message.content.includes('1=1') || message.content.includes('2=2')) {
      console.log(`it's true`)
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
 
  if (message.content.includes (`${riddlefix}hi im dad`)) {
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
