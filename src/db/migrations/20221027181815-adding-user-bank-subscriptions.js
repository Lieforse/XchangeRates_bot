'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('users', 'exchangeSources', {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['nbu'],
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'exchangeSources')
  },
}
