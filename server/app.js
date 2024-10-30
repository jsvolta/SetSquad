import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Player from './models/player.model.js'
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;

app.use(express.json());

app.get('/api/player', async (req, res) => {
    try {
        const players = await Player.find({});
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        console.error(`Error in fetching players: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to get players"});
    }
})

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

app.put('/api/player/:id', async (req, res) => {
    const {id} = req.params;

    const player = req.body;

    // Where is the error from?
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(`Error in update player: ${error.message}`);
        return res.status(404).json({ success: false, message: "Invalid player id" });
    }

    try {
        const updatedPlayer = await Player.findByIdAndUpdate(id, player, {new:true});
        res.status(200).json({success:true, data: updatedPlayer})
    } catch (error) {
        console.log(`Error in update player: ${error.message}`);
        res.status(500).json({success:false, message:"Server Error"});
    }

})

app.delete('/api/player/:id', async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(`Error in update player: ${error.message}`);
        return res.status(404).json({ success: false, message: "Invalid player id" });
    }

    try {
        await Player.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Player deleted" });
    } catch (error) {
        console.log(`Error in delete player: ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

app.listen(PORT, () => {
    console.log(`Server started at 127.0.0.1:${PORT}`);
    connectDB()
})
