const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");
const User = require("./user.model");

const Task = sequelize.define("Task", {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true, // Auto-increment ID
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  effortToComplete: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true, // createdAt and updatedAt
  tableName: "tasks",
});

Task.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Task, { foreignKey: "userId" });

module.exports = Task;
