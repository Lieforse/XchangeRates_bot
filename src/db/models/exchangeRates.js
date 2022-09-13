const { DataTypes } = require('sequelize')

module.exports = (db, modelName) => {
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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }

  const exchangeRates = db.define(modelName, model, { tableName: modelName })

  return [exchangeRates]
}
