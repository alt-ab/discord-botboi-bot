module.exports = {
    name: "invite",
    description: 'The link to me!',
    execute(message, args) {
        message.channel.send('My invite link! \n<https://discord.com/api/oauth2/authorize?client_id=702301294802501782&permissions=2147483639&scope=bot>');
    },
};