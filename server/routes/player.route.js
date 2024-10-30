import express from 'express';
import { getPlayers, createPlayer, updatePlayer, deletePlayer } from '../controllers/player.controller.js';

const router = express.Router();

router.get('/', getPlayers);

router.post('/', createPlayer);

router.put('/:id', updatePlayer);

router.delete('/:id', deletePlayer);

export default router;
