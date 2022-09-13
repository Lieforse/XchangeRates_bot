const { Sequelize } = require('sequelize')
const log = require('../utils').logger('db')
const { modelsCreator } = require('./models/index')

const database = async ({ DB_MODE, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT }) => {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  })

  try {
    await sequelize.authenticate()

    log.info('Connection to DB established')
  } catch (error) {
    log.error('Error in DB authentication: ', error)
  }

  const db = {}
  db.sequelize = sequelize
  db.Sequelize = Sequelize
  db.models = modelsCreator(sequelize)

  log.info(`Starting DB in ${DB_MODE.toUpperCase()} sync mode`)

  switch (DB_MODE) {
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
