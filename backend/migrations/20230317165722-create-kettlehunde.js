'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kettlehundes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "New Jersey"
      },
      Year: {
        type: Sequelize.INTEGER
      },
      agency: {
        type: Sequelize.STRING
      },
      County: {
        type: Sequelize.STRING
      },
      Number: {
        type: Sequelize.INTEGER
      },
      Rank: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      Terminated: {
        type: Sequelize.STRING
      },
      Demoted: {
        type: Sequelize.STRING
      },
      Suspended: {
        type: Sequelize.STRING
      },
      SuspendedDays: {
        type: Sequelize.INTEGER
      },
      SustainedCharge: {
        type: Sequelize.TEXT   // was STRING
      },
      Description: {
        type: Sequelize.TEXT   // was STRING
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
    await queryInterface.dropTable('Kettlehundes');
  }
};
