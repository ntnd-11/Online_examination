'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ExamClass extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.Student, {
                through: 'StudentExamClass',
                foreignKey: 'examClassId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Teacher, {
                foreignKey: 'teacherId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Course, {
                foreignKey: 'courseId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.hasMany(models.Exam, {
                foreignKey: 'examClassId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    ExamClass.init(
        {
            code: {
                type: DataTypes.STRING,
                unique: true,
            },
            name: DataTypes.STRING,
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            startTime: {
                type: DataTypes.STRING,
                require: true,
            },
            endTime: {
                type: DataTypes.STRING,
                require: true,
            },
            description: {
                type: DataTypes.TEXT('long'),
            },
        },
        {
            sequelize,
            modelName: 'ExamClass',
        },
    );
    return ExamClass;
};
