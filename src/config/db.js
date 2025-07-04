import {neon} from '@neondatabase/serverless'
import dotenv from 'dotenv'
dotenv.config()

export const sql = neon(process.env.DATABASE_URI)

export async function createDB() {
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