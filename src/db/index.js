const { Sequelize } = require('sequelize')
const log = require('../utils').logger('db')
const { modelsCreator } = require('./models/index')

const database = async (mode) => {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../database/index.sqlite',
  })

  try {
    await sequelize.authenticate()

    log.info('Connection to DB established')
  } catch (error) {
    log.error('Error in DB initialization: ', error)
  }

  const db = {}
  db.sequelize = sequelize
  db.Sequelize = Sequelize
  db.models = modelsCreator(sequelize)

  log.info(`Starting DB in ${mode.toUpperCase()} sync mode`)

  switch (mode) {
    case 'force':
      await db.sequelize.sync({ force: true })
      break
    case 'alter':
      await db.sequelize.sync({ alter: true })
      break
    default:
      await db.sequelize.sync()
  }

  return db
}

module.exports = { database }
