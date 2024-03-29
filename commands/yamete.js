const execute = async (bot, msg, args) => {
    await msg.delete({timeout: 2000});

    const queue = bot.queues.get(msg.member.guild.id);
    if (!msg.member.voice.channel) {
        return msg.reply("Você precisa estar em um canal de voz para dar a risadinha.");
    }

    console.log()

    if (queue) {
        msg.channel.send("A JBL está ocupada.")
            .then(msg => msg.delete({ timeout: 5000 }))
        return bot.queues.set(msg.guild.id, queue);
    }

    msg.member.voice.channel.join().then(connection => {
        const dispatcher = connection.play('./yamete.m4a');
        dispatcher.on("finish", () => {
            //msg.member.voice.channel.leave();
            dispatcher.end();
        });
    })
};

module.exports = {
  name: "yamete",
  help: "YAMETE KUDASAI",
  execute,
};

