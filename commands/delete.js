module.exports = {
    name: "delete",
    args: true,
    usage: '<number>',
    description: 'Deletes past your history :eyes:',
    execute(message, args) {
      const amount = parseInt(args[0]) + 1;

      if (isNaN(amount)) {
          return message.reply("Needs to be a number");
      } 
      else if (amount < 2 || amount > 100) {
          return message.reply("You need to input a number between 1 and 99");
      }

      message.channel.bulkDelete(amount, true)
      //need to check for permissions
    },
};