'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'imgUrl', {
      type: Sequelize.TEXT,
       allowNull: true, 

    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'imgUrl');
  }
};
