/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs')
const path = require('path')

const basename = path.basename(__filename)
const modulesPath = `${__dirname}/modules`
const utils = {}

fs.readdirSync(modulesPath)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const filePath = path.join(modulesPath, file)
    const util = require(filePath)
    const utilName = file.slice(0, -3)

    utils[utilName] = util
  })

module.exports = utils
