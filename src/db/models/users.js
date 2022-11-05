const { DataTypes } = require('sequelize')

module.exports = (db, modelName) => {
  const model = {
    chatId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    exchangeSources: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: ['nbu'],
    },
  }

  const associate = (models) => {
    models[modelName].hasMany(models.subscriptions, {
      onDelete: 'cascade',
      hooks: true,
      foreignKey: 'chatId',
      sourceKey: 'chatId',
      constraints: false,
    })
  }

  const users = db.define(modelName, model, { tableName: modelName })

  return [users, associate]
}
