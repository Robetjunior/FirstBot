const env = require("../.env");
const Telegraf = require("telegraf");
const bot = new Telegraf(env.token);

// <code> </code>
// <pre> </pre>
// <a> </a>
bot.start(async (ctx) => {
  await ctx.reply(`Seja bem vindo ${ctx.update.message.from.first_name}! ♚`);

  // com `replyWithHTML` tem a possibilidade de por FORMATAR no texto
  await ctx.replyWithHTML(`Destacando mensagem <b>HTML</b>
    <i>de varias</i> <code>formas</code> <pre>possiveis</pre>
    <a href="http://www.google.com"> Google </a>`);

  // com `replyWithMarkdown` estilo usado para FORMATAR texto no Github (README)
  await ctx.replyWithMarkdown(
    "Destacando mensagem *MARKDOWN*" +
      " _de varias_ `formas` ```possiveis```" +
      " [Google](http://www.google.com)"
  );

  // 'replyWithPhoto` utilizado para enviar uma FOTO para o usuario
  await ctx.replyWithPhoto({ source: `${__dirname}/fotoPerfil.jpeg` });
  // {source: } pesquisa no diretorio que tem dentro do PC

  await ctx.replyWithPhoto(
    "https://s2.glbimg.com/hzJUjecqvH_F_eIdyaUvdEZlZ9k=/0x0:976x549/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/x/6/d7OX4gSbmIPOBJA5vYpw/cat.jpg",
    { caption: "Olha o estilo!" }
    // caption = TITULO PARA A FOTO
  );

  await ctx.replyWithPhoto({
    url: "http://files.cod3r.com.br/curso-bot/gato2.jpg",
  });

  // instancia uma LOCALIZACAO para o usuario no chat
  await ctx.replyWithLocation(29.9773008, 31.1303068);

  // instancia um VIDEO para o usuario visualizar no chat
  await ctx.replyWithVideo("http://files.cod3r.com.br/curso-bot/cod3r-end.m4v");
});

bot.startPolling();
