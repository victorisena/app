const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  value: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
})

module.exports = Product
