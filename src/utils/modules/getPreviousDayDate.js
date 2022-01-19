const moment = require('moment')

module.exports = (amount) => moment().utcOffset(120).subtract(amount, 'days').format('YYYYMMDD')
