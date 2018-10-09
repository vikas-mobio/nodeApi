const Sequelize = require('sequelize');
const UserModel = require('./models/usersModel');

const sequelize = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

  const User = UserModel(sequelize, Sequelize);

  module.exports = {
    User
  }