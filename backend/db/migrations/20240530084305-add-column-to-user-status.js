'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'status', {
      type: Sequelize.STRING,
      allowNull: true, // Temporarily allow null values
      defaultValue: 'Pending', // Set default value to "Pending"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'status');
  }
};
