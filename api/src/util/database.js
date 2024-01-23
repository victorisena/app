require('dotenv').config()

const Sequelize = require('sequelize')

const { NAME_DB, PORT_DB, USER_DB, PASS_DB, HOST_DB, TYPE_DB } = process.env

const sequelize = new Sequelize(NAME_DB, USER_DB, PASS_DB, {
  port: PORT_DB,
  host: HOST_DB,
  dialect: TYPE_DB,

  pool: {
    max: 10,
  },
  logging: (msg) => {
    if (msg.includes('error')) {
      console.error(msg)
    }
  },
})

module.exports = sequelize
