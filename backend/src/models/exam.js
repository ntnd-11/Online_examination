'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exam extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.hasMany(models.Question, {
            //     foreignKey: 'examId',
            // });
            this.belongsToMany(models.Student, {
                through: 'Result',
                foreignKey: 'examId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.ExamClass, {
                foreignKey: 'examClassId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.hasMany(models.Question, {
                foreignKey: 'examId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.hasMany(models.StudentExamClass, {
                foreignKey: 'examId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Exam.init(
        {
            name: DataTypes.STRING,
            startTime: {
                type: DataTypes.STRING,
                require: true,
            },
            endTime: {
                type: DataTypes.STRING,
                require: true,
            },
            time: {
                type: DataTypes.STRING,
                require: true,
            },
            description: {
                type: DataTypes.TEXT('long'),
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Exam',
        },
    );
    return Exam;
};
