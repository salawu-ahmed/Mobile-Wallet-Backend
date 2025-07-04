import express from 'express'
import dotenv from 'dotenv'
import { createDB } from './config/db.js'
import rateLimiter from './middlewares/rateLimiter.js'
import transactionsRoute from './routes/transactionsRoutes.js'
import job from './config/cron.js'
dotenv.config()

// app initialization
const app = express()

// cron-job to keep backend active
// start cron-job only when we are in production
if(process.env.NODE_ENV === 'production') job.start()

// middleware
app.use(express.json())
app.use(rateLimiter)

// routes
app.get('/api/health', (req, res) => {
    res.status(200).json({status: 'ok'})
})
app.use('/api/transactions', transactionsRoute)

createDB().then(() =>
    app.listen(process.env.PORT, () => console.log('server is running on PORT:5001')
    ))