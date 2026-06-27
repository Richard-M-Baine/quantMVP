'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nationOne extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nationOne.init({
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    gender: DataTypes.STRING,
    type: DataTypes.STRING,
    rank: DataTypes.STRING,
    agency: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    date: DataTypes.STRING,
    source: DataTypes.TEXT,
    info: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'nationOne',
  });
  return nationOne;
};