var Discord = require('discord.js'); // Discord Library
var logger = require('winston'); // Logger library
var auth = require('./auth.json'); // how we access our auth token

var dispatcher;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level='debug';

// Initialize Discord bot
var bot = new Discord.Client();



//When the bot is ready, do this stuff
bot.on('ready', function(evt) {
  // Prints to command line that the bot is running off of
  logger.info('Connected');

  var channel = bot.channels.get("523696357702238226");

  channel.send("FUCKEN READY YO");


});

bot.on('message', message => {



  if (!message.guild) return;

  if (message.content === '/join') {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join().then(connection => {
        message.reply("Successfully connected to voice channel.");
        dispatcher = connection.playFile('./bork.mp3');
        // dispatcher = connection.playFile('./pet_me.mp3');

        dispatcher.on('end', () => {
          connection.playFile('./bork.mp3');
        //  connection.playFile('./pet_me.mp3');
        })
      }).catch(console.log);
    } else {
      message.reply("Try joining a voice channel first you big dummy");
    }
  }

  if (message.content === '/leave') {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave();
      message.reply("Peace out.");
    } else {
      message.reply("Try joining a voice channel first you big dummy");

    }
  }

  if (message.content === 'pet') {
    if(message.member.voiceChannel) {
      console.log("petted");
      dispatcher.pause();
    }
  }
});





// Do this when the bot receives a message




bot.login(auth.token);
