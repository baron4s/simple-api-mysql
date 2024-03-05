const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const product = require('./routes/product')
const user = require('./routes/users')
const category = require('./routes/category')
const errorHandler = require('./middleware/errorHandler')

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(
  '/public/uploads',
  express.static(path.join(__dirname + '/public/uploads')),
)

// routes
app.use('/product', product)
app.use('/auth', user)
app.use('/category', category)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT}`)
})
