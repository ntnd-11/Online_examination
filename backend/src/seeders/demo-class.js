'use strict';
const { hashSync } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Classes', [
            {
                code: 'IT1-01',
                name: 'Khoa học Máy tính - 01',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT1-02',
                name: 'Khoa học Máy tính - 02',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT1-03',
                name: 'Khoa học Máy tính - 03',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT2-01',
                name: 'Kỹ thuật Máy tính - 01',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT2-02',
                name: 'Kỹ thuật Máy tính - 02',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT2-03',
                name: 'Kỹ thuật Máy tính - 03',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'DSAI',
                name: 'Khoa học dữ liệu và Trí tuệ nhân tạo',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT-E15',
                name: 'An toàn không gian số',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT-E6',
                name: 'Công nghệ thông tin Việt - Nhật',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT-E7',
                name: 'Global ICT',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT-EP',
                name: 'Công nghệ thông tin Việt - Pháp',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT-TN',
                name: 'Chương trình cử nhân tài năng Công nghệ thông tin',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Classes', null, {});
    },
};
