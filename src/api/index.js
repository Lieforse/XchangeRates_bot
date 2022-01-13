const { get } = require('axios')
const {
  apiUrls: { NBU },
} = require('../../configs/config.json')

const getNbuData = (currency, date) => get(`${NBU}?valcode=${currency}&date=${date}&json`)

module.exports = {
  getNbuData,
}
