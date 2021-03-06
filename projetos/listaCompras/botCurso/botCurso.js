const env = require("../../../.env");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const { default: Axios } = require("axios");
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

bot.hears("Como comprar o curso?", (ctx) => {
  ctx.replyWithMarkdown(
    "Que bom... [link](https://www.cod3r.com.br/)",
    tecladoOpcoes
  );
});

bot.action("n", (ctx) => {
  ctx.reply("Ok, nao precisa ser grosso :(", tecladoOpcoes);
});

bot.action("s", async (ctx) => {
  await ctx.reply(
    `Que legal, tente me enviar sua localizacao, ou escreva uma mensagem qualquer...`,
    localizacao
  );
});

bot.hears(/mensagem qualquer/i, (ctx) => {
  ctx.replyWithMarkdown(`Essa piada e velha, tente outra...`, tecladoOpcoes);
});

bot.on("text", async (ctx) => {
  let msg = ctx.message.text;
  msg = msg.split("").reverse().join("");
  await ctx.reply(`A sua mensagem , ao contrario e: ${msg}`);
  await ctx.reply(
    `Isso mostra que eu consigo ler o que voce escreve e processar sua mensagem`,
    tecladoOpcoes
  );
});

bot.on("location", async (ctx) => {
  try {
    const url = "http://api.openweathermap.org/data/2.5/weather";
    const { latitude: lat, longitude: lon } = ctx.message.location;
    // console.log(lat, lon);
    const res = await Axios.get(
      `${url}?lat=${lat}&lon=${lon}&APPID=a9fc8dedc4c6ca17738ecc547829577a&units=metric`
    );
    await ctx.reply(`Humm.. Voce esta em ${res.data.name}`);
    await ctx.reply(
      `A temperatura ai esta em ${res.data.main.temp}C`,
      tecladoOpcoes
    );
  } catch (err) {
    ctx.reply(
      `Estou tendo problemas para pegar a tua localizacao. Voce esta no planeta terra?`,
      tecladoOpcoes
    );
  }
});

bot.startPolling();
