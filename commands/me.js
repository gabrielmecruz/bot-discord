const MessageEmbed = require("discord.js").MessageEmbed;
const moment = require('moment')
//const memberCount = require('./member-count')

const execute = (bot, msg, args) => {
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(
      `A wild ${msg.author.username} has appeared!`
    )
    .setDescription(`Olha só, ${msg.author.username}#${msg.author.discriminator}, você está utilizando \na JBL do Ney!`)
    .setThumbnail(
      msg.author.avatar
        ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${msg.author.discriminator % 5}.png`
    )
    .setURL("https://discordapp.gg")
    .setAuthor(
      "OPA",
      `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`
    )
    .addFields([
      {
        name: "Criação:",
        value: moment(msg.author.createdTimestamp).fromNow(),
        inline: true,
      },
      {
        name: "Jogando:",
        value: msg.author.presence.activities[0] ? msg.author.presence.activities[0].name : "TA JOGAND N",
        inline: true,
      },
    ])
    .setTimestamp()
    .setFooter(
      "Todos os direitos reservados",
      `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`
    );
  msg.channel.send({ embed });
};

module.exports = {
  name: "me",
  help: "Ney pega seus dados pela JBL",
  execute,
};
