const { Telegraf } = require('telegraf')
const schedule = require('node-schedule')
const { botToken } = require('./configs/secrets.json')
const { database } = require('./src/db')
const { cron } = require('./src/cron')

const { actions } = require('./src/actions')
const { commands } = require('./src/commands')

const server = async () => {
  const db = await database()

  const bot = new Telegraf(botToken)

  // initializing bot actions
  actions(bot)

  // initialing bot commands
  commands(bot, db)

  bot.launch()

  cron(bot, db)

  // Enable graceful stop
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
  process.on('SIGINT', async () => {
    await bot.stop('SIGINT')
    await db.sequelize.close()
    await schedule.gracefulShutdown()

    process.exit(0)
  })
}

server()
