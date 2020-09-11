const env = require("../.env");
const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const bot = new Telegraf(env.token);

const tecladoCarne = Markup.keyboard([
  ["🐷 Porco", "🐮 Vaca", "🐏 Carneiro"],
  ["🐔 Galinha", "🥚 Eu como e ovo"],
  ["🐟 Peixe", "🐙 Frutos do mar"],
  ["🍆 Eu sou vegetariano"],
])
  .resize()
  .extra();
// resize() --> utilizado para REDIMENCIONAR o teclado para
// ocupar a largura da conversa inteira
// extra()  --> utilizado RENDERIZA o teclado

bot.start(async (ctx) => {
  await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}!`);

  await ctx.reply(
    `Qual bebida voce prefere`,
    Markup.keyboard(["Coca", "Pepsi"]).resize().oneTime().extra()
  ); // Facilita ao usuario apenas clicar na opcao indicada para efetuar o comando
});

bot.hears(["Coca", "Pepsi"], async (ctx) => {
  await ctx.reply(`Nossa! Eu tambem gosto de ${ctx.match}`);

  await ctx.reply(`Qual a sua carne predileta?`, tecladoCarne);
});

bot.hears("🐮 Vaca", (ctx) => ctx.reply("A minha predileta tambem!"));

bot.hears("🍆 Eu sou vegetariano", (ctx) =>
  ctx.reply("Parabens, mas eu ainda gosto de carne")
);

bot.on("text", (ctx) => ctx.reply("Legal!"));

bot.startPolling();
