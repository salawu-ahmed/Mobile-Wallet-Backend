import express from 'express'
import dotenv from 'dotenv'
import { createDB } from './config/db.js'
import rateLimiter from './middlewares/rateLimiter.js'
import transactionsRoute from './routes/transactionsRoutes.js'
dotenv.config()

// app initialization
const app = express()

// middleware
app.use(express.json())
app.use(rateLimiter)

// routes
app.use('/api/transactions', transactionsRoute)

createDB().then(() =>
    app.listen(process.env.PORT, () => console.log('server is running on PORT:5001')
    ))