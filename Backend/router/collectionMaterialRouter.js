import express from 'express';
import authToken from '../middleware/authToken.js';
import { createIndividualCollection } from '../controllers/Stats/createIndividualCollection.js';

const router = express.Router();

// Ruta para insertar datos de reciclaje
router.post('/createOne', authToken, createIndividualCollection);
// router.post('/createCSV', authToken, createIndividualCollection);

export default router;
