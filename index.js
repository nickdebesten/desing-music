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
        connection.playStream("http://stream.radiocorp.nl/web10_mp3");
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
  if (message.author.id == "254273544689680386"){
message.guild.voiceConnection.disconnect();
  }
}
if(message.content.startsWith("!status")) {
  if (message.author.id == "254273544689680386"){
      var str = message.content;
      var status = str.substr(7);
      client.user.setActivity(status, { type: 'LISTENING'});
      message.channel.send("de status van de bot is veranderd.");
  } else {
    message.channel.send("niet voor jouw");
  }
}
});
client.login('NDI3MTA1NTU4NDM3Mjk4MTc4.DZfskA.kyMQ6FjjPwtR9IULTfl8wDt9lIs');
