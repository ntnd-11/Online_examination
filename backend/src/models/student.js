'use strict';
const { Model, DATE } = require('sequelize');
const { genSaltSync, hashSync } = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.belongsTo(models.Program);
            // this.belongsTo(models.Class);
            this.belongsToMany(models.ExamClass, {
                through: 'StudentExamClass',
                foreignKey: 'studentId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsToMany(models.Exam, {
                through: 'Result',
                foreignKey: 'studentId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Student.init(
        {
            code: {
                type: DataTypes.STRING,
                unique: true,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: DataTypes.STRING,
            fullname: DataTypes.STRING,
            dateOfBirth: DataTypes.STRING,
            gender: DataTypes.ENUM('MALE', 'FEMALE', 'CUSTOM'),
            ethnic: DataTypes.STRING,
            phoneNumber: {
                type: DataTypes.STRING,
                unique: true,
            },
            citizenIdentification: {
                type: DataTypes.STRING,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            cpa: DataTypes.DOUBLE,
            generation: DataTypes.INTEGER,
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Student',
            hooks: {
                beforeCreate: (user, options) => {
                    const salt = genSaltSync(10);
                    user.password = hashSync(user.password, salt);
                },
                beforeBulkCreate: (users, options) => {
                    const salt = genSaltSync(10);
                    for (const user of users) {
                        user.password = hashSync(`${user.password}`, salt);
                    }
                },
            },
        },
    );
    return Student;
};
