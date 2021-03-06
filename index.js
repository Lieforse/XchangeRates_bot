const { Telegraf } = require('telegraf')
const schedule = require('node-schedule')
const env = require('dotenv').config()
const { exitCb } = require('./src/utils')
const { database } = require('./src/db')
const { cron } = require('./src/cron')

const { actions } = require('./src/actions')
const { commands } = require('./src/commands')

const log = require('./src/utils').logger('main')

const server = async () => {
  log.info('Starting project')

  const { DB_MODE, BOT_TOKEN } = env.parsed

  if (!(DB_MODE && BOT_TOKEN)) {
    log.error('Provide all ENV variables to start the project')
    exitCb()
  }

  const db = await database(DB_MODE)

  const bot = new Telegraf(BOT_TOKEN)

  // initializing bot actions
  actions(db, bot)

  // initializing bot commands
  commands(db, bot)

  bot.launch()

  // initializing cron
  cron(db, bot)

  // Enable graceful stop
  process.on('SIGTERM', async () => exitCb(bot, db, schedule))
  process.on('SIGINT', async () => exitCb(bot, db, schedule))
}

server()
