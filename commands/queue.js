const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
      return msg.reply("não existe nenhuma música na fila");
    }

    console.log("\naaaa\n")
    var a = queue.songs.map(function(elem) {
        return {
            title: elem.title,
        } 
    });
    var s = queue.songs;
    var b = queue.songs.forEach(function(s) {
        var b = Object.assign({}, s);
        b.title += 10;
        return b;
    });

    console.log(b);
    //msg.channel.send(a)
  };
  
  module.exports = {
    name: "queue",
    help: "Imprime a atual fila de músicas",
    execute,
  };
  