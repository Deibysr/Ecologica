import multer from 'multer';
import express from 'express';
import authToken from '../middleware/authToken.js';
import { createIndividualCollection } from '../controllers/Stats/createIndividualCollection.js';
import { getAllCollections } from '../controllers/Stats/getAllCollection.js';
import { getCollectionByMonth } from '../controllers/Stats/getCollectionByMonth.js';
import { getCollectionByYear } from '../controllers/Stats/getCollectionByYear.js';
import checkIsAdmin from "../middleware/checkIsAdmin.js";
import { createStatsFromCSV } from '../controllers/Stats/createStatsFromCSV.js';
import deleteAllCollections from '../controllers/Stats/deleteAllCollections.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/createOne', authToken, checkIsAdmin, createIndividualCollection);
router.post('/createByCSV', authToken, checkIsAdmin, upload.single("file"), createStatsFromCSV);
router.get('/getAll', getAllCollections);
router.post('/getByMonth', getCollectionByMonth);
router.post('/getByYear', getCollectionByYear);
router.delete('/deleteAllData', deleteAllCollections);

export default router;
