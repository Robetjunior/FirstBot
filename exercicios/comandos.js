const env = require("../.env");
const Telegraf = require("telegraf");
const { hears } = require("telegraf");
const bot = new Telegraf(env.token);

bot.start((ctx) => {
  const nome = ctx.update.message.from.first_name;
  ctx.reply(`Seja bem vindo, ${nome}! \n Avise se precisar de /ajuda`);
});

bot.command("ajuda", (ctx) =>
  ctx.reply(
    "/ajuda: vou mostrar as opcoes" +
      "\n/ajuda2: para testar via hears" +
      "\n/op2: Opcao generica" +
      "\n/op3: Outra opcao generica qualquer"
  )
);

bot.hears("/ajuda2", (ctx) =>
  ctx.reply("Eu tambem consigo capturar comandos, mas utilize a /ajuda mesmo")
);

bot.hears(/\op(2|3)/i, (ctx) =>
  ctx.reply("Resposta padrao para comandos genericos")
);

bot.startPolling();
