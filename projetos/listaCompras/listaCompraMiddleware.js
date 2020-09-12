const env = require("../../.env");
const Telegraf = require("telegraf");
// Utilizado para renderizar o teclado
const Extra = require("telegraf/extra");
const Markup = require("telegraf/extra");
const session = require("telegraf/session");
const bot = new Telegraf(env.token);

const botoes = (lista) =>
  Extra.markup(
    Markup.inlineKeyboard(
      lista.map((item) => Markup.callbackButton(item, `delete ${item}`)),
      { columns: 3 }
    )
  );

bot.use(session());

const verificarUsuario = (ctx, next) => {
  //verificar se e o mesmo ID vindo de uma mensagem
  // o ID pode vir por uma callback ou pela mensagem
  const mesmoIDMsg =
    ctx.update.message && ctx.update.message.from.id === env.userID;
  const mesmoIDCallback =
    ctx.update.callback_query &&
    ctx.update.callback_query.from.id === env.userID;

  if (mesmoIDMsg || mesmoIDCallback) {
    next();
  } else {
    ctx.reply(`Desculpe, nao fui autorizado a conversar com voce.`);
  }
};

// Voce pode ter mais de um middleware..
const processando = ({ reply }, next) =>
  reply("processando...").then(() => next());

bot.start(verificarUsuario, async (ctx) => {
  console.log(ctx.update.message.from);
  const name = ctx.update.message.from.first_name;
  await ctx.reply(`Seja bem vindo, ${name}!`);
  await ctx.reply(`Escreva os itens que voce deseja adicionar...`);
  ctx.session.lista = [];
});

bot.on("text", verificarUsuario, processando, (ctx) => {
  let msg = ctx.update.message.text;
  ctx.session.lista.push(msg);
  ctx.reply(`${msg} adicionado`, botoes(ctx.session.lista));
});

bot.action(/delete (.+)/, verificarUsuario, processando, (ctx) => {
  ctx.session.lista = ctx.session.lista.filter((item) => item !== ctx.match[1]);
  ctx.reply(`${ctx.match[1]} deletado com sucesso!`, botoes(ctx.session.lista));
});

bot.startPolling();
