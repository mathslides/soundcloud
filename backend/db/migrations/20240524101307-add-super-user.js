'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Directly use the Sequelize models to find the user and insert into the SuperAdmins table
    const { User } = require('../models'); // Adjust the path to your models

    try {
      // Find the user by email
      const user = await User.findOne({ where: { email: 'super@temp.com' } });
      if (!user) {
        throw new Error('User with email super@temp.com not found');
      }

      // Insert the userId into the super_admin table
      await queryInterface.bulkInsert('SuperAdmins', [{
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
      
    } catch (error) {
      console.error('Error inserting super admin:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Optional: Remove the inserted super admin during rollback
    const { User } = require('../models'); // Adjust the path to your models

    try {
      // Find the user by email
      const user = await User.findOne({ where: { email: 'super@temp.com' } });
      if (user) {
        await queryInterface.bulkDelete('SuperAdmins', { userId: user.id });
      }
    } catch (error) {
      console.error('Error removing super admin:', error);
    }
  }
};
