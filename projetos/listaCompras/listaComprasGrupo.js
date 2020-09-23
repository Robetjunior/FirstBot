const env = require("../../.env");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const bot = new Telegraf(env.token);

let dados = {};

const gerarBotoes = (lista) =>
  Extra.markup(
    Markup.inlineKeyboard(
      lista.map((item) => Markup.callbackButton(item, `delete ${item}`)),
      { columns: 3 }
    )
  );

bot.start(async (ctx) => {
  const name = ctx.update.message.from.first_name;
  await ctx.reply(`Seja bem vindo, ${name}!`);
  await ctx.reply(`Escreva os itens que voce deseja adicionar!...`);
});

bot.use((ctx, next) => {});
