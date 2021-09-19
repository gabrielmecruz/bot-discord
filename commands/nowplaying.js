const { MessageEmbed } = require("discord.js");

const execute = (bot, msg, args) => {
    const server = bot.queues.get(msg.guild.id);
    if (!server || !server.songs[0]) {
        return msg.reply("nenhuma música tocando no momento");
    }

    var s = server.songs[0].timestamp;

    console.log(s);

//    let timeString = `${x / 60 | 0}:${x % 60}`
 //   console.log(timeString);

    const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setThumbnail(server.songs[0].thumbnail)
        .setTitle(`Now playing`)
        .addFields(
            {
                name: `Nome: `,
                value: `**[${server.songs[0].title}](${server.songs[0].url})**`,
            },
            {
                name: `Request By:`,
                value: `${msg.author.username}`,
            },
            {
                name: "Duração",
                value: `\`${msToHour(server.songs[0])}\` **${progressBarEnhanced(1, 50, 20)}** \`${(s)}\``
            }
        );

    return msg.channel.send({ embed });
};

const msToHour = (time) => {
    time = Math.round(time / 1000);
    const s = time % 60,
        m = ~~((time / 60) % 60),
        h = ~~(time / 60 / 60);

    return h === 0
        ? `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
        : `${String(Math.abs(h) % 24).padStart(2, "0")}:${String(m).padStart(
            2,
            "0"
        )}:${String(s).padStart(2, "0")}`;
}

const progressBarEnhanced = (current, total, barSize) => {
    const progress = Math.round((barSize * current) / total);

    return (
        "━".repeat(progress > 0 ? progress - 1 : progress) +
        "🔘"+ //
        "━".repeat(barSize - progress)
    );
};

module.exports = {
    name: "nowplaying",
    alias: "np",
    help: "Indica qual música está tocando e sua minutagem no canal atual do usuário",
    execute,
};