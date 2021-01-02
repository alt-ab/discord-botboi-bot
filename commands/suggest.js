module.exports = {
    name: "suggest",
    description: 'Any suggestions for me?',
    args: true,
    usage: "<suggestion>",
    execute(message, args) {
        console.log(message.content.substring(10));
        message.channel.send("Thank you!");
    },
};