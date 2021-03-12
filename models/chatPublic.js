'use strict'
module.exports = (sequelize, DataTypes) => {
  const Chatpublic = sequelize.define('Chatpublic', {
    UserId: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {})
  Chatpublic.associate = function (models) {
    Chatpublic.belongsTo(models.User)
  }
  return Chatpublic
}