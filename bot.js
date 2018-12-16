var Discord = require('discord.io');
valr logger = require('winston');
var auth = require('auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.console, {
  colorize: true
});
loggler.level='debug';

// Initialize Discord bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

bot.on('ready', function(evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + '-(' + bot.id + ')');
});
bot.on('message', function(user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that start with '!', for know
  if(message.substring(0,1)=='!') {
    var args = message.substring(1).split('');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      //!ping

      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
        break;

        // more cases can be added here
    }
  }
});
