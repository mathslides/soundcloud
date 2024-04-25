'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Songs', 'imgUrl', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
    await queryInterface.changeColumn('Songs', 'audioFile', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Songs', 'imgUrl', {
      type: Sequelize.STRING, 
      allowNull: true, 
    });
    await queryInterface.changeColumn('Songs', 'audioFile', {
      type: Sequelize.STRING, 
      allowNull: true, // Depending on your requirements
    });
  }
};
