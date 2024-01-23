const express = require('express')
const router = express.Router()
const controller = require('../controllers/order-controller')

const wrapRoute = action => async (req, res, next) => {
  try {
      return await action(req, res, next)
  } catch (e) {
      return next(e)
  }
}

// <baseUrl>/api/order/
router.get('/:orderId', wrapRoute(controller.getFormattedOrderById))

// <baseUrl>/api/order/
router.get('/', wrapRoute(controller.getAll))

// <baseUrl>/api/order/upload
router.post(
  '/upload',
  async (req, res, next) => {
    if (!req.file) {
      const error = new Error('Failed, file not submitted.')
      error.statusCode = 400
      return next(error)
    }

    next()
  },
  wrapRoute(controller.upload),
)

module.exports = router