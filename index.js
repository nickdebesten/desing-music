const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require('ytdl-core');

client.on('ready', () => {
  console.log(` ${client.user.tag} is online!!!`);
});

var servers = {};
var search = require('youtube-search');
 
var opts = {
  maxResults: 1, 
  key: 'AIzaSyBKO09Rokq96z6-DtSbGdxw7L9R1__ujf0' 
};


client.on('message', message => {
  
    if(message.content.startsWith("!melding")){
      if(message.member.roles.has("531842154671112202")) {
      var bericht = message.content.replace("!melding ", "");
    let melding = new Discord.RichEmbed()
    .setTitle("melding!")
    .setThumbnail(client.user.avatarURL)
    .setDescription(bericht)
    .setColor("RANDOM")
    
    message.channel.send(melding)
    
    }}
  
  
  
  
  const voiceChannel = message.member.voiceChannel;
      var isReady = true;

      if (message.content === '!join') {
if(message.member.roles.has("531842154671112202")) {
        if(!voiceChannel) {
          const embedError = new Discord.RichEmbed()
          .setTitle(`Foutmelding!`)
          .setDescription(`Ik kan je spraakkanaal niet vinden!`)
          .setColor(`#ff0000`)
          .setFooter(`Zorg dat je in een spraakkanaal zit`);

          message.channel.send(embedError)
        } else if (isReady === true) {
          voiceChannel.join().then(connection => {
            const dispatcher = connection.playStream('http://18973.live.streamtheworld.com/RADIO538.mp3');

            isReady = false;

            const embed = new Discord.RichEmbed()
            .setTitle(`ik speel muziek af`)
            .setDescription(`Je luistert nu naar Radio 538!`)
            .setColor(`#00ff00`)
            .setFooter(`Yay :D`);

            message.channel.send({embed});

            dispatcher.on("end", end => {
              voiceChannel.leave();
              message.channel.send(`Tijd is op!`);
              isReady = true;
            });
          });
        } else {
          const embedError2 = new Discord.RichEmbed()
          .setTitle(`Foutmelding!`)
          .setDescription(`Ik speel al muziek af!`)
          .setColor(`#ff0000`)
          .setFooter(`Yay :D`);

          message.channel.send(embedError2);
        }
      } 
}
     if (message.content === "!leave") {
if(message.member.roles.has("531842154671112202")) {
        if(!voiceChannel) {
          const embedError3 = new Discord.RichEmbed()
          .setTitle(`Foutmelding!`)
          .setDescription(`Ik kan je spraakkanaal niet vinden!`)
          .setColor(`#ff0000`)
          .setFooter(`Yay :D`);

          message.channel.send(embedError3);
        } else {
          voiceChannel.leave();
          message.channel.send(`Succesvol losgekoppeld!`);
        }
      }
}
     if(message.content.startsWith("!play")) {
if(message.member.roles.has("531842154671112202")) {
      message.reply('laat het feest maar beginnen!! :)');
      var str = message.content;
      var link = str.substr(8);
      search(link, opts, function(err, results) {
        if(err) return console.log(err);
        const streamOptions = { seek: 0, volume: 1 };
        message.member.voiceChannel.join().then(connection => {
          const stream = ytdl(results[0].link, { filter : 'audioonly' });
          const dispatcher = connection.playStream(stream, streamOptions);
        })
        .catch(console.error);  
      });
    }
}
  
});

client.login(process.env.TOKEN)
