'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.user);
  };
  return Task;
};