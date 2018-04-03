const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require('ytdl-core');

client.on('ready', () => {
  console.log(` ${client.user.tag} is online!!!`);
});

client.on('message', message => {
if (message.content === '?join') {
  // Only try to join the sender's voice channel if they are in one themselves
  if (!message.guild) {
    message.reply("je moet wel in een speak zitten hond");
    return;
  };
  if (message.member.voiceChannel) {
    message.member.voiceChannel.join()
      .then(connection => { // Connection is an instance of VoiceConnection
        message.reply('laat het feest maar beginnen!! :)');
        connection.playStream("http://stream.radiocorp.nl/web10_aac");
      })
      .catch(console.log);
  } else {
    message.reply('je moet wel een speak zitten hond ( ik moet wel perms hebben)');
  }
}
if(message.content == "?leave") {
  if(message.member.voiceChannel){
      message.member.voiceChannel.leave();
  } else {
      message.reply("bemoei je der niet mee hond");
  }
}
if(message.content == "?owner leave") {
  if (message.author.id == "254273544689680386" || message.author.id == "265789273070895104"){
message.guild.voiceConnection.disconnect();
  }
}
if(message.content.startsWith("!status")) {
if (message.author.id == "254273544689680386" || message.author.id == "265789273070895104"){
      var str = message.content;
      var status = str.substr(7);
      client.user.setActivity(status, { type: 'LISTENING'});
      message.channel.send("de status van de bot is veranderd.");
  } else {
    message.channel.send("niet voor jouw");
  }
}
if(message.content.startsWith("?play")) {
        message.reply('laat het feest maar beginnen!! :)');
  var str = message.content;
  var link = str.substr(8);
  const streamOptions = { seek: 0, volume: 1 };
  message.member.voiceChannel.join()    .then(connection => {
      const stream = ytdl(link, { filter : 'audioonly' });
      const dispatcher = connection.playStream(stream, streamOptions);
    })
    .catch(console.error);
  }
    if (message.content === '?invite') {
    message.reply('hier heb je de link om mij toe te voegen aan je server !https://discordapp.com/oauth2/authorize?client_id=427105558437298178&scope=bot als je niks hoort join dan deze discord voor hulp! https://discord.gg/sXzxZK6');
  }
});
client.login(process.env.TOKEN);
