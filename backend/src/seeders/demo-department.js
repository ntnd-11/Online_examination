'use strict';
const { hashSync } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Departments', [
            {
                name: 'Software Engineering',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Computer Science',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Information System',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Cyber Security',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Artificial Intelligence',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Machine Learning',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Deep Learning',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Departments', null, {});
    },
};
