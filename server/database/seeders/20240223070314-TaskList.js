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
    await queryInterface.bulkInsert('Tasklists', [
      {
        userId: 1,
        title: "Buy Groceries",
        description:
          "Go to Ralphs on Friday",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        userId: 1,
        title: "Settle Taxes",
        description:
          "Damn IRS I hate you",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        userId: 1,
        title: "Errands for today",
        description:
          "Try to get everything done by 9pm",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: "Buy Groceries",
        description:
          "Go to Ralphs on Friday",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        title: "Lunar New Year errands",
        description:
          "TODO before LNY eve",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasklists', null, {});
  }
};
