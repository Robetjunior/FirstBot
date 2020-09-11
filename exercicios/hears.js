const env = require("../.env");
const Telegraf = require("telegraf");
const moment = require("moment");
const bot = new Telegraf(env.token);

// Bot responde `Quero` caso o usuario digite 'pizza' no chat
bot.hears("pizza", (ctx) => ctx.reply("Quero!"));

// Bot responde `Passo` caso o usuario digite 'figado' ou 'chuchu'
bot.hears(["figado", "chuchu"], (ctx) => ctx.reply("Passo!"));

bot.hears("🐷", (ctx) => ctx.reply("Bacooooon!"));

// a palavra entra ( / /i ) ignora letras maiusculas e minusculas
bot.hears(/burger/i, (ctx) => ctx.reply("Burger?! Querooo!"));

bot.hears([/brocolis/i, /salada/i], (ctx) => ctx.reply("Passo!"));

// captura a data no formato do REGEX INDICADO
// no exemplo a baixo ele captura no formato DD/MM/YYYY
bot.hears(/(\d{2}\/\d{2}\/\d{4})/, (ctx) => {
  moment.locale("pt-BR");
  const data = moment(ctx.match[1], "DD/MM/YYYY");
  ctx.reply(`${ctx.match[1]} cai em ${data.format("dddd")}`);
});

bot.startPolling();
