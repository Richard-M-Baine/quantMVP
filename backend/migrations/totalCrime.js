'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TotalCrimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Offense: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      AverageIncarcerationDays: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      TotalCasesDays: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      TotalIncarcerationDays: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      MaxSentenceDays: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      MinSentenceDays: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      StdDevSentence:{
        type: Sequelize.FLOAT,
        allowNull: true
      },
      MedianSentence: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      ModeSentence: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      AverageProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      TotalProbationMonthInstances: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      TotalProbationMonths: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      MaxProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      MinProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      StdDevProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      MedianProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      ModeProbationMonth: {
        type: Sequelize.FLOAT,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TotalCrimes');
  }
};