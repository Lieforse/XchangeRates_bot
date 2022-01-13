const { Sequelize } = require('sequelize')
const log = require('../utils').logger('db')
const { models } = require('./models/index')

const database = async () => {
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
  db.models = models(sequelize)

  await db.sequelize.sync()

  return db
}

module.exports = { database }
