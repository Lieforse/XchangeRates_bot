const { Telegraf } = require('telegraf')
const schedule = require('node-schedule')
const env = require('dotenv').config()
const { exitCb } = require('./src/utils')
const { database } = require('./src/db')
const { cron } = require('./src/cron')

const { actions } = require('./src/actions')
const { commands } = require('./src/commands')

const server = async () => {
  const db = await database()

  const bot = new Telegraf(env.parsed.BOT_TOKEN)

  // initializing bot actions
  actions(bot)

  // initializing bot commands
  commands(bot, db)

  bot.launch()

  // initializing cron
  cron(bot, db)

  // Enable graceful stop
  process.on('SIGTERM', () => exitCb(bot, db, schedule))
  process.on('SIGINT', () => exitCb(bot, db, schedule))
}

server()
