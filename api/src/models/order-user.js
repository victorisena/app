const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const OrderUser = sequelize.define('orderUser', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
})

module.exports = OrderUser
