const schedule = require('node-schedule')
const log = require('../utils').logger('cron')
const { getFromNbu_action } = require('../actions/modules/getFromNbu_action')

const cron = async (db, bot) => {
  log.info('Starting cron')
  schedule.scheduleJob({ hour: 9, tz: 'EET' }, async () => {
    log.info('Starting daily job')
    try {
      const users = await db.models.users.findAll()

      const usersPromise = users.map(({ chatId }) => getFromNbu_action(db, bot, chatId, 'USD'))
      await Promise.all(usersPromise)

      log.info('Daily job finished')
    } catch (error) {
      log.error(error)
    }
  })
}

module.exports = { cron }
