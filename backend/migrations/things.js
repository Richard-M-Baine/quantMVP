'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Things', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      County: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DOB: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Age_Today: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Indictment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Offense: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Jail: {
        type: Sequelize.STRING,
        allowNull: true
      },
       Lab: {
        type: Sequelize.STRING,
        allowNull: true
      },
      DEDR: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Restitution: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Comments: {
        type: Sequelize.STRING,
        allowNull: true
      },
     
     
      Judge: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Sentence: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sentdt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      penalty: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fine: {
        type: Sequelize.STRING,
        allowNull: true
      },
      TotalIncarcerationDays: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      TotalProbationMonths: {
        type: Sequelize.FLOAT,
        allowNull: false
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Things');
  }
};