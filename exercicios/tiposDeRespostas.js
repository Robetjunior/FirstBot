const env = require("../.env");
const Telegraf = require("telegraf");
const bot = new Telegraf(env.token);

// com replyWithHTML tem a possibilidade de por efeitos no texto
// <code> </code>
// <pre> </pre>
// <a> </a>
bot.start(async (ctx) => {
  await ctx.reply(`Seja bem vindo ${ctx.update.message.from.first_name}! ♚`);
  await ctx.replyWithHTML(`Destacando mensagem <b>HTML</b>
    <i>de varias</i> <code>formas</code> <pre>possiveis</pre>
    <a href="http://www.google.com"> Google </a>`);
});

bot.startPolling();
