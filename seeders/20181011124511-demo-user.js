'use strict';
var dateTime = require('node-datetime');

module.exports = {
  up: (queryInterface, Sequelize) => {

     /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */

      return queryInterface.bulkInsert('users', [{
        name: 'John Doe',
        email: 'ramu028@gmail.com',
        password:'ramu028',
        createdAt:dateTime.create().format('Y-m-d H:M:S'),
        updatedAt:dateTime.create().format('Y-m-d H:M:S')
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
