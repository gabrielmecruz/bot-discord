const { MessageEmbed } = require("discord.js");

const execute = (bot, msg, args) => {
  const server = bot.queues.get(msg.guild.id);
  if (!server || server.songs.length < 1) {
    return msg.reply("não existe nenhuma música na fila");
  }

  let index = 1;
  let strNow = "";
  let strQ = "";

  if (server.songs[0]) strNow += `${server.songs[0].title} - ${server.songs[0].timestamp}\n`;
  if (server.songs[1]) {
    strQ += `${server.songs.slice(1, 10).map(x => `${index++}) ${x.title} - ${x.timestamp}`).join("\n")}`
  } else strQ = "Ø"

  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setThumbnail(server.songs[0].thumbnail)
    .addFields([
      {
        name: "Tocando agora:",
        value: strNow,
        inline: false,
      },
      {
        name: "Próximas:",
        value: `${strQ}`,
        inline: false,
      },
    ])
    .setTitle(`Fila de músicas`)

  return msg.channel.send({ embed });

};

module.exports = {
  name: "queue",
  alias: "q",
  help: "Imprime a atual fila de músicas",
  execute,
};