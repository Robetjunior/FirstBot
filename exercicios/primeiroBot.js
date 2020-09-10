const env = require("../.env");
const Telegraf = require("telegraf");
const bot = new Telegraf(env.token);

//comando executado quando o usuario digita "/start"
bot.start((ctx) => {
  const from = ctx.update.message.from;
  console.log(from);
  ctx.reply(`Seja bem vindo, ${from.first_name}!`);
});

//monitora o envio de texto
bot.on("text", async (ctx, next) => {
  await ctx.reply("Mid 1");
  next();
});

bot.on("text", async (ctx, next) => {
  await ctx.reply("Mid 2");
  next();
});

//Polling manda mensagem para o API do telegram para verificar se tem uma nova mensagem
//para fazer alguma execucao
bot.startPolling();
