'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        username: 'janedoe',
        email: 'janedoe@example.com',
        pwdhash: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jondoe',
        email: 'jondoe@example.com',
        pwdhash: '12345',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'chuawh',
        email: 'chuachuachua@example.com',
        pwdhash: 'ilikeaazel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'aritra',
        email: 'ariiraari@example.com',
        pwdhash: 'ihatevvv',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
