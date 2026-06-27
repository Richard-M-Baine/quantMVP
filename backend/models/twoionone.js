'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TwoNation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TwoNation.init({
    firstName: DataTypes.STRING,
    MiddleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    Name: DataTypes.STRING,
    state: DataTypes.STRING,
    agency: DataTypes.STRING,
    Year: DataTypes.STRING,
    Link: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'TwoNation',
  });
  return TwoNation;
};