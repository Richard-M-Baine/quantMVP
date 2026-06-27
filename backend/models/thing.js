'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Thing extends Model {
    /**
     * Helper method for defining associations.
     * This file is not a part of the Sequelize documentation.
     * It is just a general recommendation.
     * It's a good place to define foreign key relationships.
     * For example, if 'Thing' belonged to a 'User' model:
     * static associate(models) {
     * Thing.belongsTo(models.User);
     * }
     */
    static associate(models) {
      // define association here
    }
  }

  // The sequelize.define method is used to define the model.
  // The first argument is the model name ('Thing').
  // The second argument is an object defining the model's attributes.
  // The third argument is an options object.
  Thing.init({
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
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DOB: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Age_Today: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Indictment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Offense: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Jail: {
      type: DataTypes.STRING,
      allowNull: true
    },
  
    Lab: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DEDR: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Restitution: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Comments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Judge: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Sentence: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sentdt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    penalty: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fine: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TotalIncarcerationDays: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TotalProbationMonths: {
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
    // Other model options go here
    sequelize,
    modelName: 'Thing',
    tableName: 'Things', // Explicitly specify the table name to avoid any pluralization issues
    timestamps: true // This is already true by default, but good to be explicit
  });
  return Thing;
};