const env = require("../../.env");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const bot = new Telegraf(env.token);

let lista = [];

const botoes = () =>
  Extra.markup(
    Markup.inlineKeyboard(
      lista.map((item) => Markup.callbackButton(item, `delete ${item}`)),
      { columns: 3 }
    )
  );

bot.start(async (ctx) => {
  const name = ctx.update.message.from.first_name;
  await ctx.reply(`Seja bem vindo, ${name}!`);
  await ctx.reply(`Escreva os itens que voce deseja adicionar...`);
});

bot.on("text", (ctx) => {
  lista.push(ctx.update.message.text);
  ctx.reply(`${ctx.update.message.text} foi adicionado na lista!`, botoes());
});

bot.action(/delete (.+)/, (ctx) => {
  //vai criar uma nova lista com todos os elementos diferentes ao item clicado
  lista = lista.filter((item) => item !== ctx.match[1]);
  ctx.reply(`${ctx.match[1]} deletado!`, botoes());
});

bot.startPolling();
