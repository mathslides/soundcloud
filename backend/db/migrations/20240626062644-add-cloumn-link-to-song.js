'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Songs', 'link', {
      type: Sequelize.STRING,
      allowNull: true, 

    });
    await queryInterface.changeColumn('Songs', 'audioFile', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Songs', 'link');
    await queryInterface.changeColumn('Songs', 'audioFile', {
      type: Sequelize.TEXT,
      allowNull: false, 
    });
  }
};
