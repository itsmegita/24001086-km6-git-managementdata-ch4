"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Cars", [
      {
        name: "Chevrolet",
        rentPerDay: 840490,
        size: "medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ford",
        rentPerDay: 289420,
        size: "medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toyota",
        rentPerDay: 520121,
        size: "large",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BMW",
        rentPerDay: 677243,
        size: "small",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toyota",
        rentPerDay: 303392,
        size: "large",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ford",
        rentPerDay: 312420,
        size: "small",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toyota",
        rentPerDay: 775541,
        size: "small",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chevrolet",
        rentPerDay: 610309,
        size: "small",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chevrolet",
        rentPerDay: 498334,
        size: "small",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ford",
        rentPerDay: 701111,
        size: "small",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Cars", null, {});
  },
};
