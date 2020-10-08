const execute = (bot, msg, args) => {
    return msg.channel.send("Eaí fake");
  };
  
  module.exports = {
    name: "fake",
    help: "Fake do Ney",
    execute,
  };