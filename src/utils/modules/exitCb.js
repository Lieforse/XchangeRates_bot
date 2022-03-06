const log = require('./logger')(__filename)

module.exports = async (bot, db, cron) => {
  const processes = []
  if (bot) {
    processes.push(exitFunction(() => bot.stop, 'Bot has been stopped'))
  }
  if (db) {
    processes.push(exitFunction(() => db.sequelize.close, 'Database has been stopped'))
  }
  if (cron) {
    processes.push(exitFunction(() => cron.gracefulShutdown, 'Cron has been stopped'))
  }

  await Promise.all(processes).then(() => {
    log.info('All processes have been stopped')
    process.exit(0)
  })
}

const exitFunction = async (cb, message) => {
  await cb()
  log.info(message)
}
