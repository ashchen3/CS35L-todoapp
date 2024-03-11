'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      pwdhash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      friendReqReceivedFromIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      friendReqReceivedFromNames: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      friendIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      friends: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};