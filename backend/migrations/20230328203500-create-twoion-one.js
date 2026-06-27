'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TwoNations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName:{
        type: Sequelize.STRING
      },
      middleName:{
        type: Sequelize.STRING
      },
      lastName:{
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      agency: {
        type: Sequelize.STRING
      },
      Year: {
        type: Sequelize.STRING
      },
      Link: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TwoNations');
  }
};