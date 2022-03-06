const path = require('path')
const logger = require('log4js')
const {
  logger: { level },
} = require('../../../configs/config.json')

module.exports = (filename) => {
  const category = path.basename(filename, '.js')
  const log = logger.getLogger(category)
  log.level = level

  return log
}
