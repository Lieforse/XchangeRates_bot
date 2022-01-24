const { DataTypes } = require('sequelize')

module.exports = (db) => {
  const model = {
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
  }

  const exchangeRates = db.define('exchangeRates', model, { tableName: 'exchangeRates' })

  return exchangeRates
}
