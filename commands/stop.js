const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  
  if (!queue) {
    return msg.reply("não existe nenhuma música sendo reproduzida");
  }
  
  queue.songs = [];
  bot.queues.set(msg.guild.id, queue);
  queue.dispatcher.end();
  return bot.queues.delete(msg.member.guild.id);
};

module.exports = {
  name: "stop",
  alias: "s",
  help: "Para a reprodução de músicas no servidor",
  execute,
};
