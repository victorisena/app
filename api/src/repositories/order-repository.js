require('dotenv').config()

const { Op } = require('sequelize')
const { ITEMS_PER_PAGE } = process.env

const Order = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')

exports.getById = async (id) => {
  const res = await Order.findOne({ where: { order_id: id } })
  return res
}

exports.getFormattedOrderById = async (id) => {
  const findParams = {
    attributes: ['user_id', 'name'],
    include: [
      {
        model: Order,
        attributes: ['order_id', 'date'],
        include: [
          {
            model: Product,
            attributes: ['product_id', 'value'],
          },
        ],
        where: {
          order_id: id,
        },
      },
    ],
  }

  const res = await User.findAll(findParams)

  if (!res || res.length === 0) {
    return null
  }

  const formattedData = res.map((user) => {
    const orders = user.orders.map((order) => {
      const total = order.products.reduce(
        (sum, product) => sum + parseFloat(product.value),
        0,
      )
      const formattedTotal = parseFloat(total.toFixed(2))

      return {
        order_id: order.order_id,
        date: order.date,
        total: formattedTotal,
        products: order.products.map((product) => ({
          product_id: product.product_id,
          value: parseFloat(product.value),
        })),
      }
    })

    return [
      {
        user_id: user.user_id,
        name: user.name,
        orders: orders,
      },
    ]
  })

  return formattedData[0] || null
}

exports.getAll = async (page = null, startDate = null, endDate = null) => {
  let offset
  let limit = parseInt(ITEMS_PER_PAGE)

  if (page) {
    const pageNumber = parseInt(page, 10)
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new Error('Número de página inválido')
    }
    offset = (pageNumber - 1) * ITEMS_PER_PAGE
  }

  const findParams = {
    attributes: ['user_id', 'name'],
    include: [
      {
        model: Order,
        attributes: ['order_id', 'date'],
        include: [
          {
            model: Product,
            attributes: ['product_id', 'value'],
          },
        ],
      },
    ],
  }

  if (startDate && endDate) {
    findParams.include[0].where = {
      date: {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      },
    }
  }

  if (page) {
    findParams.offset = offset
    findParams.limit = limit
  }

  const res = await User.findAll(findParams)

  if (!res) return null

  const formattedData = res.map((user) => {
    const orders = user.orders.map((order) => {
      const total = order.products.reduce(
        (sum, product) => sum + parseFloat(product.value),
        0,
      )
      const formattedTotal = parseFloat(total.toFixed(2))

      return {
        order_id: order.order_id,
        date: order.date,
        total: formattedTotal,
        products: order.products.map((product) => ({
          product_id: product.product_id,
          value: product.value,
        })),
      }
    })

    return [
      {
        user_id: user.user_id,
        name: user.name,
        orders: orders,
      },
    ]
  })

  return formattedData
}

exports.create = async (data) => {
  const res = await Order.create(data)
  return res
}

exports.findOrCreate = async (where, defaults) => {
  const { result, created } = await Order.findOrCreate({
    where,
    defaults,
  })

  return { result, created }
}
