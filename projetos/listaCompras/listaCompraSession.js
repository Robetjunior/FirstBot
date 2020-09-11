const env = require("../../.env");
const Telegraf = require("telegraf");
// Utilizado para renderizar o teclado
const Extra = require("telegraf/extra");
const Markup = require("telegraf/extra");
const session = require("telegraf/session");
const bot = new Telegraf("env.token");
