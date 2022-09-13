/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs')
const path = require('path')

const modelsCreator = (db) => {
  const basename = path.basename(__filename)
  const models = {}
  const associations = []

  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
      const filePath = path.join(__dirname, file)
      const fileName = path.basename(file, '.js')
      const [model, association] = require(filePath)(db, fileName)

      models[model.name] = model

      if (association) {
        associations.push(association)
      }
    })

  associations.forEach((associationCb) => {
    associationCb(models)
  })

  return models
}

module.exports = { modelsCreator }
