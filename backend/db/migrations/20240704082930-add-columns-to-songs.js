'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Songs', 'tiktokLink', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
    await queryInterface.addColumn('Songs', 'facebookLink', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Songs', 'tiktokLink');
    await queryInterface.removeColumn('Songs', 'facebookLink');

  }
};
