const User = require('../models/user')

exports.getById = async (id) => {
  const res = await User.findOne({ where: { user_id: id } })
  return res
}

exports.getAll = async () => {
  const res = await User.find({})
  return res
}

exports.create = async (data) => {
  const res = await User.create(data)
  return res
}

exports.findOrCreate = async (user_id, data) => {
  const [result, created] = await User.findOrCreate({
    where: { user_id },
    defaults: data,
  })

  return { result, created }
}
