const env = require("../.env");
const Telegraf = require("telegraf");
const axios = require("axios");
const bot = new Telegraf(env.token);

bot.on("voice", async (ctx) => {});
