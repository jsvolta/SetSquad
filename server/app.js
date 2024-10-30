import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;

app.listen(PORT, () => {
    console.log(`Server started at 127.0.0.1:${PORT}`);
    connectDB()
})
