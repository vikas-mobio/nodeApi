'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blogs = sequelize.define('Blogs', {
    title: DataTypes.STRING
  }, {});
  Blogs.associate = function(models) { 
    // associations can be defined here
    Blogs.belongsTo(models.user);
  };
  return Blogs;
};