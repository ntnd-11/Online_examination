'use strict';
const { hashSync } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Courses', [
            {
                code: 'FL1100',
                name: 'Tiếng Anh 1',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'FL1101',
                name: 'Tiếng Anh 2',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'SSH1111',
                name: 'Triết học Mác - Lênin',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'ED3220',
                name: 'Kỹ năng mềm',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT4501',
                name: 'Đảm bảo chất lượng phần mềm',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT4788',
                name: 'Phát triển ứng dụng đa nền tảng',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT4409',
                name: 'Công nghệ Web và dịch vụ trực tuyến',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT4490',
                name: 'Thiết kế và xây dựng phần mềm',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'IT4441',
                name: 'Giao diện và trải nghiệm người dùng',
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Courses', null, {});
    },
};
