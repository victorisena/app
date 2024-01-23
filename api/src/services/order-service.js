const orderRepository = require('../repositories/order-repository')
const userRepository = require('../repositories/user-repository')
const productRepository = require('../repositories/product-repository')
const orderUserRepository = require('../repositories/orderUser-repository')
const format = require(`../util/format`)

exports.getAllOrders = async (page, startDate, endDate) => {
  return await orderRepository.getAll(page, startDate, endDate)
}

exports.uploadOrder = async (fileContent) => {
  let fileLines = fileContent.split(`\n`).filter((line) => line.trim() !== '')

  const batchSize = 100
  const totalLines = fileLines.length
  for (let i = 0; i < totalLines; i += batchSize) {
    const batchEndIndex = Math.min(i + batchSize, totalLines)
    fileLines.slice(i, batchEndIndex).map(async (item) => {
      if (item) {
        const { order_id, date, user_id, userName, product_id, value } =
          format.extractFields(item)

        const { result: user, created } = await userRepository.findOrCreate(
          user_id,
          { name: userName },
        )

        if (!created) {
          user.name = userName
          await user.save()
        }

        let { result: order, created: orderCreated } =
          await orderRepository.findOrCreate(
            { order_id },
            {
              user_id: user.user_id,
              date,
              total: 0,
            },
          )

        if (!orderCreated) {
          order = await orderRepository.getById(order_id)
        }

        let { result: orderUser, created: orderUserCreated } =
          await orderUserRepository.findOrCreate(user_id, order_id, {
            product_id,
            productPrice: value,
          })

        if (!orderUserCreated) {
          orderUser = await orderUserRepository.getByUserOrder(
            user_id,
            order_id,
          )
        }

        let product = await productRepository.create({
          product_id,
          value: parseFloat(value),
          order_id: order.order_id,
          orderuser_id: orderUser.id,
        })

        orderUser.products = orderUser.products || []
        orderUser.products.push(product)
        await Promise.all([orderUser.save(), order.save()])
        return { user, order, orderUser, product }
      }
    })
  }
}

exports.getFormattedOrderById = async (orderId) => {
  return await orderRepository.getFormattedOrderById(orderId)
}
