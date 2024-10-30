import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        skill_level: {
            type: Number,
            required: true
        }
    }, 
    {
        timestamps: true // adds createdAt and updatedAt timestamps
    }
);

const Player = mongoose.model('Player', playerSchema);

export default Player;
