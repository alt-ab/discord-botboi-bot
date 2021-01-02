module.exports = {
    name: "dm",
    description: 'Talk to me!',
    execute(message, args) {
        message.author.send(`Yessir!`);
    },
};