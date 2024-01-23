const Product = require('../models/product')

exports.getById = async (id) => {
  const res = await Product.findOne({ where: { product_id: id } })
  return res
}

exports.getAll = async () => {
  const res = await Product.find({})
  return res
}

exports.create = async (data) => {
  const res = await Product.create(data)
  return res
}
