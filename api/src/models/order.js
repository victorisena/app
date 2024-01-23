const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Order = sequelize.define('order', {
  order_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
})

module.exports = Order
