'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('super_admin', 'SuperAdmins');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('SuperAdmins', 'super_admin');
  }
};
