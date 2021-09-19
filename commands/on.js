const execute = (bot, msg, args) => {
  return msg.channel.send("O pai ta on");
};

module.exports = {
  name: "on",
  help: "Verifica se o pai ta on!",
  execute,
};
