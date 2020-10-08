const execute = (bot, msg, args) => {
  let string = "*--- Comandos ---*\n\n";
  //tal como o for, repete o processo imprimindo os nomes dos comandos armazenados na variavel 'command'
  //tanto seu nome('name') como sua função ('help')
  bot.commands.forEach((command) => {
    if (command.help) {
      string += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
    }
  });
  return msg.channel.send(string);
};

module.exports = {
  name: "help",
  help: "Exibe a ajuda de todos os comandos",
  execute,
};
