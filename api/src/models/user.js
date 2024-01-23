const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = User
