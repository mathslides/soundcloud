'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Songs', 'youtubeLink', {
      type: Sequelize.STRING,
      allowNull: true, 

    });
    await queryInterface.changeColumn('Songs', 'audioFile', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Songs', 'youtubeLink');
    await queryInterface.changeColumn('Songs', 'audioFile', {
      type: Sequelize.TEXT,
      // allowNull: false, 
    });
  }
};
