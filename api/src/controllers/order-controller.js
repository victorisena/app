const { validationResult } = require('express-validator')
const orderService = require('../services/order-service')

exports.getAll = async (req, res, next) => {
  try {
    const { page, startDate, endDate } = req.query
    const formattedStartDate = startDate ? new Date(startDate) : null
    const formattedEndDate = endDate ? new Date(endDate) : null

    const orders = await orderService.getAllOrders(
      page,
      formattedStartDate,
      formattedEndDate,
    )

    return res.status(200).json({ orders })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Error' })
  }
}

exports.upload = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, data is incorrect.')
    console.log(errors)
    error.statusCode = 422
    return next(error)
  }

  const fileContent = req.file.buffer.toString('utf8')
  try {
    await orderService.uploadOrder(fileContent)

    return res.status(201).json({
      message: 'Imported successfully!',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Error' })
  }
}

exports.getFormattedOrderById = async (req, res, next) => {
  const { orderId } = req.params
  const orders = await orderService.getFormattedOrderById(orderId)

  return res.status(200).json({ orders: [orders] })
}