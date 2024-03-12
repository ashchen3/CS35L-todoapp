'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Tasklist, {
        foreignKey: 'userId',
        as: 'tasklists',
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    username: { type: DataTypes.STRING, allowNull: false },
    email: DataTypes.STRING,
    pwdhash: DataTypes.STRING,
    salt: DataTypes.STRING,
    friendReqReceivedFromIds: DataTypes.ARRAY(DataTypes.INTEGER),
    friendReqReceivedFromNames: DataTypes.ARRAY(DataTypes.STRING),
    friendReqSentIds: DataTypes.ARRAY(DataTypes.INTEGER),
    friendReqSentNames: DataTypes.ARRAY(DataTypes.STRING),
    friendIds: DataTypes.ARRAY(DataTypes.INTEGER),
    friends: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};