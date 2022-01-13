module.exports = (bot, db, cron) => {
  if (bot) {
    bot.stop()
  }
  if (db) {
    db.sequelize.close()
  }
  if (cron) {
    cron.gracefulShutdown()
  }

  process.exit(0)
}
