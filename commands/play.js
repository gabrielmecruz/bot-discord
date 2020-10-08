const search = require("yt-search");
const ytdl = require("ytdl-core-discord");
const { Message } = require("discord.js");
const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {
  const s = args.join(" ");
  try {
    //metodo 'search' busca no yt pela biblioteca 'yt-search'
    search(s, (err, result) => {
/*
      const busca = new MessageEmbed()
      .setTitle(':mag_right: Buscando:')
      .setAuthor(
        `${bot.user.username}`,
        `https://cdn.discordapp.com/icons/${bot.user.id}/${bot.user.icon}.png`)
      .setColor('#0099ff')
      .setDescription(`${s}`)
      .setFooter(
        `Usuário: + ${msg.author.id}`,
        `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`
      )
      .setTimestamp();
      msg.channel.send({ busca });
*/
      if (err) {
      throw err;
    } else if (result && result.videos.length > 0) {
      //se encontrar um resultado e o mesmo tiver valor, a variavel 'song' pega o
      //primeiro resultado do vetor de busca do yt (pos[0])
      const song = result.videos[0];

      //cria o parametro da fila e a adição de música na mesma ('push')
      const queue = bot.queues.get(msg.guild.id);
      if (queue) {
        queue.songs.push(song);
        bot.queues.set(msg.guild.id, queue);

        if (queue.songs.length > 0) {
          const embed = new MessageEmbed()
          .setTitle("")
          .setAuthor("")
          .addFields([
            {
              name: "By",
              value: `@${msg.author.username}`,
              inline: true,
            },
            {
              name: "Canal",
              value: msg.channel.name,
              inline: true,
            },
          ])
          .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id}}) adicionada à fila`)
          msg.channel.send({ embed });
          //msg.channel.send(`${song.title} adicionada à fila.`)
        }

      } else playSong(bot, msg, song);
    } else {
      return msg.reply("desculpe, não encontrei o que você desejava!");
    }
  });
} catch (e) {
  console.error(e);
}
};

const playSong = async (bot, msg, song) => {
  let queue = bot.queues.get(msg.member.guild.id);
  if (!song) {
    //se não tiver musica, faz uma verificação forçada se existe fila para o código não quebrar
    //seta o tempo de 60 segundo (1 min) após acabar a fila para o bot se desconectar do canal
    if (queue) {
      setTimeout(() => { queue.connection.disconnect() }, 60000);
      console.log("Delete member")
      //limpa a fila após desconectar
      return bot.queues.delete(msg.member.guild.id);
    }
  }

  //verifica se o membro está em algum canal de voz para se conectar
  if (!msg.member.voice.channel) {
    return msg.reply("Você precisa estar em um canal de voz para reproduzir uma música!");
  }

  //verifica se existe fila. caso não, cria uma nova definindo os valores da chave
  if (!queue) {
    const conn = await msg.member.voice.channel.join();
    queue = {
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song],
    };
  }

  //método que pega a música encontrar e reproduz pela função 'ytdl' através do url
  //e define alguns parâmetros de reprodução
  queue.dispatcher = await queue.connection.play(await ytdl(song.url, {
    highWaterMark: 1 << 25, filter: "audioonly"
  }), {
    type: "opus"
  }
  );

  //imprime a música que está tocando
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`${song.title}`)
    .setURL(song.url)
    .setAuthor(
      `Tocando`,
      `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`
    )
    .addFields([
      {
        name: "By",
        value: `@${msg.author.username}`,
        inline: true,
      },
      {
        name: "Canal",
        value: msg.channel.name,
        inline: true,
      },
    ])
  msg.channel.send({ embed });

  //quando acabar a reprodução atual, seta o proximo para a primeira posição da fila e reproduz a música na pos(0) da função 'playSong' 
  queue.dispatcher.on("finish", () => {
    queue.songs.shift();
    playSong(bot, msg, queue.songs[0]);
  });
  bot.queues.set(msg.member.guild.id, queue);
};

module.exports = {
  name: "play",
  alias: "p",
  help: "Reproduz a música desejada no canal atual do usuário",
  execute,
  playSong
};

