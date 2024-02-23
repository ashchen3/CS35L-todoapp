'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Task, {
        foreignKey: 'tasklistId',
        as: 'tasks',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
        onDelete: 'CASCADE'
      });
    }
  }
  Tasklist.init({
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    quickAccessTaskList: DataTypes.ARRAY(DataTypes.STRING),
    userId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Tasklist',
  });
  return Tasklist;
};