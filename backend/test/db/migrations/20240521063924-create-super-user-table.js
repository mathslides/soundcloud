'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the super_admin table
    await queryInterface.createTable('super_admin', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });

    // Insert the super admin user
    // Directly use the Sequelize models to find the user and insert into the super_admin table
    const { User } = require('../models'); // Adjust the path to your models

    try {
      // Find the user by email
      const user = await User.findOne({ where: { email: 'super@temp.com' } });
      if (!user) {
        throw new Error('User with email super@temp.com not found');
      }
 
      // Insert the userId into the super_admin table
      await queryInterface.bulkInsert('super_admin', [{
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
      
    } catch (error) {
      console.error('Error inserting super admin:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('super_admin');
  }
};
