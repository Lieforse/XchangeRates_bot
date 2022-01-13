const moment = require('moment')

module.exports = (amount) => moment().subtract(amount, 'days').format('YYYYMMDD')
