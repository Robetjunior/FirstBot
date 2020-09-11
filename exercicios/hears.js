const env = require("../.env");
const Telegraf = require("telegraf");
const moment = require("moment");
const bot = new Telegraf(env.token);

// Bot responde `Quero` caso o usuario digite 'pizza' no chat
bot.hears("pizza", (ctx) => ctx.reply("Quero!"));

// Bot responde `Passo` caso o usuario digite 'figado' ou 'chuchu'
bot.hears(["figado", "chuchu"], (ctx) => ctx.reply("Passo!"));

bot.hears("🐷", (ctx) => ctx.reply("Bacooooon!"));

// a palavra entra ( / /i ) ignora letras maiusculas e minusculas
bot.hears(/burger/i, (ctx) => ctx.reply("Burger?! Querooo!"));

bot.hears([/brocolis/i, /salada/i], (ctx) => ctx.reply("Passo!"));

bot.startPolling();
