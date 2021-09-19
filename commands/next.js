const playSong = require("./play").playSong;
const stop = require("./stop").execute;

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);

  if (!queue) {
    return msg.reply("não existe nenhuma música sendo reproduzida");
  }
 
  if (queue.songs.length > 1) {
    queue.songs.shift();
    bot.queues.set(msg.guild.id, queue);
    playSong(bot, msg, queue.songs[0]);
  } else {
    stop(bot, msg, args);
  }
};

module.exports = {
  name: "next",
  alias: "n",
  help: "Pula para a próxima música",
  execute,
};
