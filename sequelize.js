const Sequelize = require('sequelize');
const UserModel = require('./app/models/usersModel');
const BlogModel = require('./app/models/blogs');
const TaskModel = require('./app/models/task');

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
  });

  const User = UserModel(sequelize, Sequelize);
  const Blog = BlogModel(sequelize, Sequelize);
  const Task = TaskModel(sequelize, Sequelize);

  module.exports = {
    User,
    Blog,
    Task
  }