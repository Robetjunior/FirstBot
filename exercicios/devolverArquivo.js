const env = require("../.env");
const Telegraf = require("telegraf");
const axios = require("axios");
const bot = new Telegraf(env.token);

// o bot envia uma MENSAGEM DE VOZ. A mesma que o usuario acabou de enviar no chat
bot.on("voice", async (ctx) => {
  const id = ctx.update.message.voice.file_id;
  const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`);
  ctx.replyWithVoice({ url: `${env.apiFileUrl}/${res.data.result.file_path}` });
});

// o bot envia uma FOTO. A mesma que o usuario acabou de enviar no chat
bot.on("photo", async (ctx) => {
  const id = ctx.update.message.photo[0].file_id;
  const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`);
  ctx.replyWithPhoto({ url: `${env.apiFileUrl}/${res.data.result.file_path}` });
});

bot.startPolling();
