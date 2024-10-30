import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Player from './models/player.model.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;

app.use(express.json());

app.post('/api/player', async (req, res) => {
    const player = req.body;

    if (!player.name || !player.skill_level) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newPlayer = new Player(player);

    try {
        await newPlayer.save();
        res.status(201).json({ success: true, data: newPlayer });
    } catch (error) {
        console.log(`Error in Create player: ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

app.listen(PORT, () => {
    console.log(`Server started at 127.0.0.1:${PORT}`);
    connectDB()
})
