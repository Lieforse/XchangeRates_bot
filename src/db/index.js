const { Sequelize } = require('sequelize')
const { models } = require('./models/index')

const database = async () => {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../localDb/index.sqlite',
  })

  try {
    await sequelize.authenticate()

    console.log('Connection to DB established')
  } catch (error) {
    console.log('Error in DB initialization: ', error)
  }

  await sequelize.sync()

  const db = {}

  db.sequelize = sequelize
  db.models = models(sequelize)

  return db
}

module.exports = { database }
