const { get } = require('axios')
const { NBU } = require('../../configs/apiUrls.json')

const getNbuData = (currency, date) => get(`${NBU}?valcode=${currency}&date=${date}&json`)

module.exports = {
  getNbuData,
}
