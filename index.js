const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs"); //ler os arquivos do comando
const path = require("path");
dotenv.config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();

//faz a leitura de todos os arquivos dentro do path './commands' terminado em '.js' 
const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".js"));

for (var filename of commandFiles) {
  const command = require(`./commands/${filename}`);
  bot.commands.set(command.name, command);
}

bot.login(process.env.TOKEN);

//quando ligado, confirma a leitura do bot no console.log
bot.on("ready", function () {
  console.log(`${bot.user.username} ligada`);
  bot.user.setPresence({
    activity: {
      name: "a JBL que pisca! _help", type: 2,
    }
  })
});

bot.on("message", (msg) => {
  //verifica se a chamada foi realizada com o prefixo / caso não, retorna sem valor
  if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;
  const args = msg.content.slice(process.env.PREFIX.length).split(" ");
  const command = args.shift();

//executa o metodo 'execute' em cada arquivo .js que fez a leitura e realiza o tratamento de exceção
//caso não seja encontrado o arquivo
  try {
    bot.commands.get(command).execute(bot, msg, args);
  } catch (e) {
    console.error(e);
    return msg.reply("Ops! Eu ainda não conheço esse comando!");
  }
});
