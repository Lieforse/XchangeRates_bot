/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs')
const path = require('path')

module.exports = (dirname, filename) => {
  const basename = path.basename(filename)
  const methods = {}

  fs.readdirSync(dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
      const filePath = path.join(dirname, file)
      const method = require(filePath)
      const methodName = file.slice(0, -3)

      methods[methodName] = method
    })

  return methods
}
