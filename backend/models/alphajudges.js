'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Judge extends Model {
    static associate(models) {
      // 1 Judge has many JudgeCrimes
      Judge.hasMany(models.JudgeCrime, {
        foreignKey: 'JudgeId',
        as: 'crimes' // alias for easy access
      });
    }
  }

  Judge.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    County: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Judge: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'Judge',
    tableName: 'Judges',
    timestamps: true
  });

  return Judge;
};
