const schedule = require('node-schedule')
const log = require('../utils').logger('cron')
const { dataActualizer_job, subscriptions_job } = require('./modules')

const cron = async (db, bot) => {
  log.info('Started cron')

  schedule.scheduleJob({ minute: 0, tz: 'EET' }, async (time) => {
    await subscriptions_job(db, bot, time)
  })

  schedule.scheduleJob({ hour: 0, minute: 0, tz: 'EET' }, async () => {
    await dataActualizer_job(db)
  })
}

module.exports = { cron }
