const { Telegraf } = require('telegraf')
const schedule = require('node-schedule')
const env = require('dotenv').config()
const { exitCb } = require('./src/utils')
const { database } = require('./src/db')
const { cron } = require('./src/cron')

const { actions } = require('./src/actions')
const { commands } = require('./src/commands')
const validateEnv = require('./src/utils/modules/validateEnv')

const log = require('./src/utils').logger('main')

const server = async () => {
  log.info('Starting project')

  const isEnvValid = validateEnv(env.parsed)
  if (!isEnvValid) {
    log.fatal('Provide all ENV variables to start the bot')
    exitCb()

    return
  }

  const db = await database(env.parsed)

  const bot = new Telegraf(env.parsed.BOT_TOKEN)

  // initializing bot actions
  actions(db, bot)

  // initializing bot commands
  commands(db, bot)

  try {
    await bot.launch()

    log.info('Bot has been launched')
  } catch (error) {
    log.fatal(`Error in launching bot: ${error}`)
  }

  bot.catch((error) => {
    log.error(`Error from bot: ${error}`)
  })

  // initializing cron
  cron(db, bot)

  // Enable graceful stop
  process.on('SIGTERM', async () => exitCb(bot, db, schedule))
  process.on('SIGINT', async () => exitCb(bot, db, schedule))
}

server()
