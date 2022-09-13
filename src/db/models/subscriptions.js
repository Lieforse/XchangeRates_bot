const { DataTypes } = require('sequelize')

module.exports = (db, modelName) => {
  const model = {
    chatId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'chatId',
      },
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  }

  const associate = (models) => {
    models[modelName].belongsTo(models.users, {
      onDelete: 'cascade',
      hooks: true,
      foreignKey: 'chatId',
      targetKey: 'chatId',
      constraints: false,
    })
  }

  const subscriptions = db.define(modelName, model, { tableName: modelName })

  return [subscriptions, associate]
}
