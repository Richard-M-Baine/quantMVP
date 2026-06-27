'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JudgeCrimes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Judge: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Offense: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      AverageIncarcerationYear: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      TotalCasesYear: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      TotalIncarcerationYears: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      MaxSentenceYear: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      MinSentenceYear: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      StdDevSentenceYear: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      MedianSentenceYear: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      ModeSentenceYear: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      AverageProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      TotalProbationMonthInstances: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      TotalIncarcerationMonth: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      MaxProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      MinProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      StdDevProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      MedianProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      ModeProbationMonth: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      County: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      JudgeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Judges', // Must match the table name in Judges migration
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JudgeCrimes');
  },
};
