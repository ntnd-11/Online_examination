'use strict';
const { Model, DATE } = require('sequelize');
const { genSaltSync, hashSync } = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.belongsTo(models.Department);
            this.hasMany(models.ExamClass, {
                foreignKey: 'teacherId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Teacher.init(
        {
            username: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: DataTypes.STRING,
            fullname: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                unique: true,
            },
            citizenIdentification: {
                type: DataTypes.STRING,
                unique: true,
            },
            dateOfBirth: DataTypes.STRING,
            ethnic: DataTypes.STRING,
            gender: DataTypes.ENUM('MALE', 'FEMALE', 'CUSTOM'),
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Teacher',
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
    return Teacher;
};
