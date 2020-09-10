const env = require("../.env");
const Telegraf = require("telegraf");
const bot = new Telegraf(env.token);

bot.start((ctx) => {
  const from = ctx.update.message.from;
  ctx.reply(`Seja bem vindo, ${from.first_name}`);
});

// ctx.update.message.text --> captura o texto que o usuario digitou no chat
bot.on("text", (ctx) => {
  ctx.reply(`Texto '${ctx.update.message.text}' recebido com sucesso`);
});

// Evento executado quando o usuario envia a sua localizacao pelo Telegram
// ira imprimir para o usuario a Latitude e Longitude do proprio usuario
bot.on("location", (ctx) => {
  const location = ctx.update.message.location;
  console.log(location);
  ctx.reply(`Entendido, voce esta em
        Lat: ${location.latitude},
        Lon: ${location.longitude}!`);
});

// Evento 'contact' que executa quando o usuario manda algum contato para o chat
bot.on("contact", (ctx) => {
  const contact = ctx.update.message.contact;
  console.log(contact);
  ctx.reply(`Vou lembrar do(a)
        ${contact.first_name} (${contact.phone_number})`);
});

// Evento 'voice' que executa quando o usuario manda um audio
bot.on("voice", (ctx) => {
  const voice = ctx.update.message.voice;
  console.log(voice);
  ctx.reply(`Audio recebido! Ele possui ${voice.duration} segundos!`);
});

// Evento 'photo' executa quando o usuario envia uma foto no chat
bot.on("photo", (ctx) => {
  const photo = ctx.update.message.photo;
  console.log(photo);
  photo.forEach((ph, i) => {
    ctx.reply(`Photo ${i} tem resolucao de ${ph.width} x ${ph.height}`);
  });
});

// Evento 'sticker' executa quando o usuario envia uma foto no chat
bot.on("sticker", (ctx) => {
  const sticker = ctx.update.message.sticker;
  console.log(sticker);
  ctx.reply(`Estou vendo que voce enviou 
        o ${sticker.emoji} do conjunto ${sticker.set_name}+`);
});

bot.startPolling();
