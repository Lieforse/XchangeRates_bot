const schedule = require('node-schedule')
const log = require('../utils').logger('cron')
const { getFromNbu_action } = require('../actions/modules/getFromNbu_action')

const cron = async (bot, { models }) => {
  log.info('Starting cron')
  schedule.scheduleJob('0 0 9 * * *', async () => {
    try {
      const users = await models.users.findAll()

      users.forEach(({ chatId }) => {
        getFromNbu_action(bot, chatId, 'USD')
      })
    } catch (error) {
      log.error(error)
    }
  })
}

module.exports = { cron }
