'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StudentExamClass extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Exam, {
                foreignKey: 'examId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.ExamClass, {
                foreignKey: 'examClassId',
            });
        }
    }
    StudentExamClass.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            isStart: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isFinish: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'StudentExamClass',
        },
    );
    return StudentExamClass;
};
