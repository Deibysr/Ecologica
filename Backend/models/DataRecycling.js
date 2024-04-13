import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';

const db = await connectDB()

export const DataRecycling = db.define('DataRecycling', {
    typeRecycling: { type: Sequelize.STRING },
    quantity: { type: Sequelize.NUMBER },
    timeStamp: { type: Sequelize.STRING },
    userId: { type: Sequelize.STRING },
}, { timestamps: false })