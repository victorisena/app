const request = require('supertest')
const path = require('path')
const app = require('../../app')

describe('Order Controller', () => {
  test('POST /api/order/upload returns 201', async () => {
    const filePath = path.join(__dirname, 'data_test.txt')
    const response = await request(app)
      .post('/api/order/upload')
      .attach('file', filePath)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('message', 'Imported successfully!')
  })

  test('POST /api/order/upload returns 400', async () => {
    const response = await request(app)
      .post('/api/order/upload')

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('message', 'Failed, file not submitted.')
  })

  test('GET /api/order/ returns 200', async () => {
    const response = await request(app).get('/api/order/')

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('orders')
  })

  test('GET /api/order/:id returns 200', async () => {
    const response = await request(app).get(`/api/order/${753}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('orders')
  })
})
