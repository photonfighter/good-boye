var Discord = require('discord.io'); // Discord Library
var logger = require('winston'); // Logger library
var auth = require('./auth.json'); // how we access our auth token

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level='debug';

// Initialize Discord bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

//When the bot is ready, do this stuff
bot.on('ready', function(evt) {
  // Prints to command line that the bot is running off of
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + '-(' + bot.id + ')');
});

// Do this when the bot receives a message
bot.on('message', function(user, userID, channelID, message, evt) {
  logger.info('Message received:' + message);

  // Our bot needs to know if it will execute a command
  // It will listen for messages that start with '!', for now
  if(message.substring(0,1)=='!') {
    logger.info("'!' detected!");

    // Finds a string that starts with !
    var args = message.substring(1).split('');
    args = args.join('');

    switch(args) {
      //!ping

      case 'ping':
        logger.info('ping detected!');
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
        break;

        // more cases can be added here
    }
  }
});
