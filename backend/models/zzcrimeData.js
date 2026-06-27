'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CrimeData extends Model {
        static associate(models) {
            CrimeData.belongsTo(models.TotalCrime, {
                foreignKey: 'totalCrimeId',
                as: 'totalCrime'
            });
        }
    }

    CrimeData.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        Offense: {
            type: DataTypes.STRING,
            allowNull: false
        },
        OffenseCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        IncidentsPerYear: {
            type: DataTypes.JSON,
            allowNull: false
        },
        AverageSentencePerYear: {
            type: DataTypes.JSON,
            allowNull: false
        },
        yearlyAveragePunishedOnly: {
            type: DataTypes.JSON,
            allowNull: false
        },
         IncarcerationPercentage: {
            type: DataTypes.JSON,
            allowNull: false
        },
        yearlyProbationAverageAll: {
            type: DataTypes.JSON,
            allowNull: false
        },
          yearlyProbationAveragePunishedOnly: {
                type: DataTypes.JSON,
                allowNull: false
            },
            probationPercentage: {
                type: DataTypes.JSON,
                allowNull: false
            },
       
        totalCrimeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
        model: 'TotalCrime',
        key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
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
        modelName: 'CrimeData',
        tableName: 'CrimeData',
        timestamps: true
    });

    return CrimeData;
};
