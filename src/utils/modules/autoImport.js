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
      const methodName = path.basename(file, '.js')
      const method = require(filePath)

      methods[methodName] = method
    })

  return methods
}
