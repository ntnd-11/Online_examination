'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Students', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type:Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fullname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dateOfBirth: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            gender: {
                type: Sequelize.ENUM('MALE', 'FEMALE', 'CUSTOM'),
                allowNull: false,
            },
            ethnic: {
                type: Sequelize.STRING,
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            citizenIdentification: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            cpa: {
                type: Sequelize.DOUBLE,
            },
            generation: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Students');
    },
};
