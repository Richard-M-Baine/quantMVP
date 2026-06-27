'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('CrimeData', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Offense: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            OffenseCount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            IncidentsPerYear: {
                type: Sequelize.JSON,
                allowNull: false
            },
            AverageSentencePerYear: {
                type: Sequelize.JSON,
                allowNull: false
            },
            yearlyAveragePunishedOnly: {
                type: Sequelize.JSON,
                allowNull: false
            },
           
            IncarcerationPercentage: {
                type: Sequelize.JSON,
                allowNull: false
            },
            yearlyProbationAverageAll: {
                type: Sequelize.JSON,
                allowNull: false
            },
            yearlyProbationAveragePunishedOnly: {
                type: Sequelize.JSON,
                allowNull: false
            },
            probationPercentage: {
                type: Sequelize.JSON,
                allowNull: false
            },
            totalCrimeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'TotalCrime', // Must match the bloody table name in totalCrime migration for the love of mary
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        await queryInterface.dropTable('CrimeData');
    }
};