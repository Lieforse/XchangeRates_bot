'use strict'

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.renameColumn('exchangeRates', 'from', 'base')
    await queryInterface.renameColumn('exchangeRates', 'to', 'quote')
    await queryInterface.addColumn('exchangeRates', 'source', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'nbu',
    })
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('exchangeRates', 'base', 'from')
    await queryInterface.renameColumn('exchangeRates', 'quote', 'to')
    await queryInterface.removeColumn('exchangeRates', 'source')
  },
}
