module.exports = {
    name: "callout",
    description: 'Shoutout time! And yes, you can shoutout multiple people',
    args: true,
    usage: '<user(s)>',
    aliases: ["shoutout"],
    execute(message, args) {
          //working with multiple mentions aka a Collection/array
        if (!message.mentions.users.size) {
            return message.channel.send("You need to call out people!")
        }
  
        const callOutList = message.mentions.users.map(
            user => {
                return `${user.tag} <${user.displayAvatarURL({format: "png", dynamic: true})}>`;
            });
  
        message.channel.send(callOutList);
    },
};