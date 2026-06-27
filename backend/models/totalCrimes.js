'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TotalCrime extends Model {
    static associate(models) {
    TotalCrime.hasOne(models.CrimeData, {
        foreignKey: 'totalCrimeId',
        as: 'crimeData'
    });
}
  }

  TotalCrime.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Offense: {
      type: DataTypes.STRING,
      allowNull: false
    },
    AverageIncarcerationDays: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TotalCasesDays: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TotalIncarcerationDays: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MaxSentenceDays: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MinSentenceDays: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    StdDevSentence: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    MedianSentence: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ModeSentence: {
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
    TotalProbationMonths: {
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
      allowNull: false
    },
    MedianProbationMonth: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ModeProbationMonth: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'TotalCrime',
    tableName: 'TotalCrimes',
    timestamps: true
  });

  return TotalCrime;
};