const { users } = require('./user')

const models = (db) => ({
  users: users(db),
})

module.exports = { models }
