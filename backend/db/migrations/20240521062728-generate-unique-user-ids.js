'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create a sequence object starting from 10
    await queryInterface.sequelize.query(`
      CREATE SEQUENCE user_id_seq
        START 10
        INCREMENT 1;
    `);

    // Modify the Users table to use the sequence object to generate unique IDs
    await queryInterface.changeColumn('Users', 'id', {
      type: DataTypes.INTEGER,
      defaultValue: Sequelize.literal('nextval(\'user_id_seq\')'),
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes
    await queryInterface.changeColumn('Users', 'id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    });

    await queryInterface.sequelize.query(`
      DROP SEQUENCE user_id_seq;
    `);
  },
};