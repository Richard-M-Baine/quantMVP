'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nationOnes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.STRING
      },
      agency: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.TEXT
      },
      info: {
        type: Sequelize.TEXT,
        allowNull: true
      },
       createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nationOnes');
  }
};