const OrderUser = require('../models/order-user')

exports.getByUserOrder = async (user_id, order_id) => {
  const res = await OrderUser.findOne({ where: { user_id, order_id } })
  return res
}

exports.getAll = async () => {
  const res = await OrderUser.find({})
  return res
}

exports.create = async (data) => {
  const res = await OrderUser.create(data)
  return res
}

exports.update = async (user_id, product_id, data) => {
  const res = await this.getById(user_id, product_id)
  res.product_id = data.product_id
  res.productPrice = Number(data.productPrice)

  const updatedItem = await res.save()
  return updatedItem
}

exports.findOrCreate = async (user_id, order_id, data) => {
  const { result, created } = await OrderUser.findOrCreate({
    where: { user_id, order_id },
    defaults: data,
  })

  return { result, created }
}
