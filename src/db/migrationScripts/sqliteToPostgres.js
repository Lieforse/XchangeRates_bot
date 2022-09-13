const _ = require('lodash')
const { Sequelize } = require('sequelize')
const env = require('dotenv').config()
const log = require('../../utils').logger(__filename)
const { modelsCreator } = require('../models')

const sqliteToPostgres = async () => {
  const sqliteDbConnection = new Sequelize({
    dialect: 'sqlite',
    storage: './database/index.sqlite',
  })

  const sqliteDb = await createDatabase(sqliteDbConnection)

  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = env.parsed

  const postgresDbConnection = new Sequelize('postgres', DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  })

  const postgresDb = await createDatabase(postgresDbConnection, 'force')

  const sqliteModels = Object.entries(sqliteDb.models)
  log.info(`Data will be transfered for ${JSON.stringify(Object.keys(sqliteDb.models))} tables`)
  const rowsPerQuery = 10

  for (let i = 0; i < sqliteModels.length; i += 1) {
    const [modelName, model] = sqliteModels[i]
    log.info(`Started transfering data for ${modelName} table`)

    const rowsAmount = await model.count()
    const cyclesAmount = rowsAmount / rowsPerQuery

    for (let j = 0; j < cyclesAmount; j += 1) {
      const data = await model.findAll({
        limit: rowsPerQuery,
        offset: j * rowsPerQuery,
        raw: true,
      })

      const preparedData = data.map((item) => _.omit(item, ['id', 'createdAt', 'updatedAt']))

      await postgresDb.models[`${modelName}`].bulkCreate(preparedData)
    }
    log.info(`Finished transfering data for ${modelName} table`)
  }
}

const createDatabase = async (sequelize, mode) => {
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

;(async () => {
  try {
    await sqliteToPostgres()
  } catch (e) {
    log.fatal('Stopping the process because of unexpected error:', e)
  }
})()
