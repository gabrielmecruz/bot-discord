const execute = (bot, msg, args) => {
  return msg.channel.send("O PAI TA ON PRA CARALHO!");
};

module.exports = {
  name: "on",
  help: "O pai ta on!",
  execute,
};
