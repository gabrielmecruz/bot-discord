const execute = (bot, msg, args) => {
  //cria a variavel responsavel por 
  const queue = bot.queues.get(msg.guild.id);
  //faz a verificação se existe fila de musica
  if (!queue) {
    return msg.reply("não existe nenhuma música sendo reproduzida");
  }
  //dispara a funcao 'pause' na variavel da fila
  queue.dispatcher.pause();
};

module.exports = {
  name: "pause",
  help: "Pausa a reprodução de música atual",
  execute,
};
