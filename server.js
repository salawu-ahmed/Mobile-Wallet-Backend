import express from 'express'
import dotenv from 'dotenv'
import { sql } from './config/db.js'
dotenv.config()

// app initialization
const app = express()
app.use(express.json())

// 
async function createDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log('Database initialised successfully');

    } catch (error) {
        console.log('Error initializing the database', error);
        process.exit(1)  //status code 1 means failure and 0 means success 
    }
}

// routes
app.get('/', (req, res) => res.send('It is working'))
app.post('/api/transactions', async (req, res) => {
    try {
        const { title, amount, category, user_id } = req.body

        if (!title || !category || !user_id || amount == undefined) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const transaction = await sql`
        INSERT INTO transactions(user_id, title, amount, category)
        VALUES (${user_id}, ${title}, ${amount}, ${category})
        RETURNING *
        `
        res.status(201).json(transaction)
    } catch (error) {
        console.log('Error creating the transaction', error);
        res.status(500).send('Internal Server Error')
        
    }
})

createDB().then(() =>
    app.listen(process.env.PORT, () => console.log('server is running on PORT:5001')
    ))