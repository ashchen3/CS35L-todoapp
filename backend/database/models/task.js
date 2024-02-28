'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Tasklist, {
        foreignKey: 'tasklistId',
        as: 'parent-tasklist',
        onDelete: 'CASCADE'
      });
    }
  }
  Task.init({
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    completed:  { type: DataTypes.BOOLEAN, allowNull: false },
    deadline: DataTypes.DATE,
    tasklistId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};