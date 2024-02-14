const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const product = require('./routes/product')

dotenv.config()

app.use(express.json())

app.use(cors())

// routes
app.use('/product', product)

app.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT}`)
})
