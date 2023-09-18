'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Result extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Student, {
                foreignKey: 'studentId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            this.belongsTo(models.Exam, {
                foreignKey: 'examId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Result.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            score: DataTypes.DOUBLE,
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Result',
        },
    );
    return Result;
};
