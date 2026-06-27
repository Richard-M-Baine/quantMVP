'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CountyCrimes', {
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
      Offense: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      AverageIncarcerationLength: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      TotalCasesYear: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      TotalIncarcerationAmount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      MaxSentence: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      MinSentence: {
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
      AverageProbation: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      TotalProbationInstances: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      TotalProbationMonthSum: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      MaxProbation: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      MinProbation: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      StdDevProbation: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      MedianProbation: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      ModeProbation: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      IDD: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('CountyCrimes');
  }
};