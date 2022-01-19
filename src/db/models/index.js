/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs')
const path = require('path')

const modelsCreator = (db) => {
  const basename = path.basename(__filename)
  const models = {}

  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
      const filePath = path.join(__dirname, file)
      const model = require(filePath)(db)

      models[model.name] = model
    })

  return models
}

module.exports = { modelsCreator }
