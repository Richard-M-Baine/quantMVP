'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JudgeCrime extends Model {
    static associate(models) {
      // Each JudgeCrime belongs to one Judge
      JudgeCrime.belongsTo(models.Judge, {
        foreignKey: 'JudgeId',
        as: 'judge'
      });
    }
  }

  JudgeCrime.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Judge: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Offense: {
      type: DataTypes.STRING,
      allowNull: false
    },
    AverageIncarcerationYear: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TotalCasesYear: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TotalIncarcerationYears: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MaxSentenceYear: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MinSentenceYear: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    StdDevSentenceYear: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    MedianSentenceYear: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ModeSentenceYear: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    AverageProbationMonth: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TotalProbationMonthInstances: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TotalIncarcerationMonth: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    MaxProbationMonth: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MinProbationMonth: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    StdDevProbationMonth: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    MedianProbationMonth: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ModeProbationMonth: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    County: {
      type: DataTypes.STRING,
      allowNull: false
    },
    JudgeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Judges', // must match tableName
        key: 'id'
      },
      onDelete: 'CASCADE', // optional
      onUpdate: 'CASCADE'  // optional
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'JudgeCrime',
    tableName: 'JudgeCrimes',
    timestamps: true
  });

  return JudgeCrime;
};
