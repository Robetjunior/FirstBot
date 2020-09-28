const env = require("../../../.env");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const bot = new Telegraf(env.token);

const tecladoOpcoes = Markup.keyboard([
  ["O que sao bots?", "O que verei no curso?"],
  ["Posso mesmo automatizar tarefas?"],
  ["Como comprar o curso?"],
])
  .resize()
  .extra();

const botoes = Extra.markup(
  Markup.inlineKeyboard(
    // O botao sera escrito 'Sim' mas o evento vai ser 's'
    [Markup.callbackButton("Sim", "s"), Markup.callbackButton("Nao", "n")],
    { columns: 2 }
  )
);

const localizacao = Markup.keyboard([
  Markup.locationRequestButton("Clique aqui para enviar sua localizacao"),
])
  .resize()
  .oneTime()
  .extra();

bot.start(async (ctx) => {
  const name = ctx.update.message.from.first_name;
  await ctx.replyWithMarkdown(`*Ola, ${name}!* \n Eu sou o ChatBot do curso!`);
  await ctx.replyWithPhoto("http://files.cod3r.com.br/curso-bot/bot.png");
  await ctx.replyWithMarkdown("_Posso te ajudar em algo?_", tecladoOpcoes);
});

bot.hears("O que sao bots?", (ctx) => {
  ctx.replyWithMarkdown(
    "Bots sao bla, bla bla... \n _Algo mais?_",
    tecladoOpcoes
  );
});

bot.hears("O que verei no curso?", async (ctx) => {
  await ctx.replyWithMarkdown("No *curso* ... tb vamos criar *3 projetos*:");
  await ctx.reply("1. Um bot que vai gerenciar a sua lista de compras");
  await ctx.reply("2. Um bot que vai ter permitir seus eventos");
  await ctx.reply(
    "3. E voce vera como eu fui feito, isso mesmo, voce poderia fazer uma copia de mim"
  );
  await ctx.replyWithMarkdown("\n\n_Algo mais?_", tecladoOpcoes);
});

bot.hears("Posso mesmo automatizar tarefas?", async (ctx) => {
  await ctx.replyWithMarkdown(
    "Claro que sim, o bot servira... \nQuer uma palinha?",
    botoes
  );
});

bot.startPolling();
