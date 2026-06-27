'use strict';

module.exports = (sequelize, DataTypes) => {
  const CountyCrime = sequelize.define('CountyCrime', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    County: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Offense: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AverageIncarcerationLength: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TotalCasesYear: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TotalIncarcerationAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MaxSentence: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MinSentence: {
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
    AverageProbation: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TotalProbationInstances: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TotalProbationMonthSum: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    MaxProbation: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MinProbation: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    StdDevProbation: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MedianProbation: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ModeProbation: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    IDD: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'CountyCrimes',
    timestamps: true, // This enables createdAt and updatedAt
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  // Define associations here if needed
  CountyCrime.associate = function(models) {
    // associations can be defined here
  };

  return CountyCrime;
};