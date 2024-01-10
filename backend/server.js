import colors from 'colors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './database/database.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const port = process.env.PORT || 5000

connectDB()

const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes middleware for home page
app.get('/', (req, res) => {
  res.send('API is Working!')
})

// routes middleware for products and users
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(colors.rainbow(`Server is running on port http://localhost:${process.env.PORT}`))
})
