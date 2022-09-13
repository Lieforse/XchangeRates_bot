const moment = require('moment')
const { exchange_action } = require('../../actions/modules')

const log = require('../../utils').logger(__filename)

module.exports = async (db, bot, cronTime) => {
  const cronParsedTime = moment(cronTime).format('HH:mm')
  log.info(`Starting subscriptions job ${cronParsedTime}`)

  try {
    const users = await db.models.users.findAll({ include: ['subscriptions'] })
    const jobs = []

    for (let i = 0; i < users.length; i += 1) {
      const { chatId, subscriptions } = users[i]

      for (let index = 0; index < subscriptions.length; index += 1) {
        const { currency, time: dbTime } = subscriptions[index]
        const dbParsedTime = moment(dbTime, 'HH:mm:ss').format('HH:mm')

        if (cronParsedTime === dbParsedTime) {
          jobs.push(exchange_action(db, bot, chatId, currency))
        }
      }
    }

    await Promise.all(jobs)

    log.info('Subscriptions job finished')
  } catch (error) {
    log.error(error)
  }
}
