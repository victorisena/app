require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const sequelize = require('./src/util/database')

const { SERVER_PORT } = process.env

const app = express()

//Carregar todas as rotas
const orderRoute = require('./src/routes/order-routes')

//Configurando o multer para receber os arquivos enviados e armazena-los em memória
const storage = multer.memoryStorage()

// Definindo um filtro para o arquivo enviado
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/plain') {
    cb(null, true) // Arquivo aceito
  } else {
    cb(new Error('Apenas arquivos .txt são aceitos'), false) // Rejeita o arquivo
  }
}

//Configurando o CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE, PATCH',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
  next()
})

app.use(bodyParser.json({ limit: '50mb' }))

//Rota para Teste de comunicação da API
app.get('/', function (req, res, next) {
  res.status(200).json({ message: 'Ok' })
})

const upload = multer({ storage: storage, fileFilter: fileFilter })
app.use(`/api/order/`, upload.single('file'), orderRoute)

//Configurando nossa reposta padronizada de erro
app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error?.data || {}
  console.log(status, message)

  res.status(status).json({ message, data })
})

const User = require('./src/models/user')
const Order = require('./src/models/order')
const Product = require('./src/models/product')
const OrderUser = require('./src/models/order-user')

// Relacionamento entre User e Order
User.hasMany(Order, { foreignKey: 'user_id' })
Order.belongsTo(User, { foreignKey: 'user_id' })

// Relacionamento entre Order e Product
Order.hasMany(Product, { foreignKey: 'order_id' })
Product.belongsTo(Order, { foreignKey: 'order_id' })

// Relacionamento da nossa entidade com User e Product
OrderUser.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
OrderUser.hasMany(Product, { as: 'products', foreignKey: 'orderuser_id' })

sequelize
  .authenticate()
  .then(() => {
    return sequelize.sync()
  })
  .then(() => {
    app.listen(SERVER_PORT)
  })
  .catch((err) => {
    console.error('Não foi possível se conectar ao banco de dados:', err)
  })

module.exports = app
