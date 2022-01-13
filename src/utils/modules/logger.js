const logger = require('log4js')
const {
  logger: { level },
} = require('../../../configs/config.json')

module.exports = (category) => {
  const log = logger.getLogger(category)
  log.level = level

  return log
}
