const moment = require('moment')

module.exports = () => moment().utcOffset(120).format('YYYYMMDD')
