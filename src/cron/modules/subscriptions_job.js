const { exchange_action } = require('../../actions/modules')

const log = require('../../utils').logger(__filename)

module.exports = async (db, bot) => {
  log.info('Starting daily job')
  try {
    const users = await db.models.users.findAll()

    const usersPromise = users.map(({ chatId }) => exchange_action(db, bot, chatId, 'USD'))
    await Promise.all(usersPromise)

    log.info('Daily job finished')
  } catch (error) {
    log.error(error)
  }
}
