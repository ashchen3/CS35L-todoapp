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
    await queryInterface.bulkInsert('Tasks', [
      {
        tasklistId: 1,
        title: "Chicken",
        description:
          "~250g",
        completed: false,
        deadline: new Date(2024, 1, 23),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        tasklistId: 1,
        title: "Brocolli",
        description:
          "2 stalks",
        completed: false, 
        deadline: new Date(2024, 1, 23),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        tasklistId: 1,
        title: "Pasta",
        description:
          "Penne, 1 Packet of 250g",
        completed: false,
        deadline: new Date(2024, 1, 23),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        tasklistId: 3,
        title: "Pick up kid from preschool",
        description:
          "Leave by 5pm else the jam will start",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tasklistId: 4,
        title: "Chicken",
        description:
          "~250g",
        completed: false,
        deadline: new Date(2024, 1, 23),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        tasklistId: 4,
        title: "Brocolli",
        description:
          "2 stalks",
        completed: false,
        deadline: new Date(2024, 1, 23),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        tasklistId: 4,
        title: "Pasta",
        description:
          "Penne, 1 Packet of 250g",
        completed: false,
        deadline: new Date(2024, 1, 23),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tasklistId: 5,
        title: "Oranges",
        description:
          "Get 20",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tasklistId: 5,
        title: "Dumplings",
        description:
          "Get 2 packs, at least 30",
        completed: false,
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
  }
};
