import express from 'express';
import { createDataRecycling } from '../controllers/Stats/createDataRecycling.js';
import authToken from '../middleware/authToken.js';

const router = express.Router();

// Ruta para insertar datos de reciclaje
router.post('/create', authToken ,createDataRecycling);

export default router;
