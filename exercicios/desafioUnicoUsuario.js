// Ao seu dispor, mestre!
// Sinto muito, mas eu so falo com meu mestre.

const env = require("../.env");
const Telegraf = require("telegraf");
const bot = new Telegraf(env.token);

bot.start((ctx) => {
  const from = ctx.update.message.from;
  from.id === 123
    ? ctx.reply(`Seja bem vindo, ${from.first_name}`)
    : ctx.reply(`Sinto muito mas so falo com meu mestre!`);
  console.log(from);
});

bot.startPolling();
